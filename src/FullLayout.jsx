import { useState, useRef } from "react"
import "./styles.css"
import FeedbackSection from "./components/feedback-section"
import HowItWorks from "./components/how-it-works"
import TrustandPrivacy from "./components/trust-and-privacy"
import { logEvent } from "firebase/analytics";
import { getAnalyticsInstance } from "./config/firebase-config"

export default function LandingPage() {
  const [uploadClicked, setUploadClicked] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showUploadPrompt, setShowUploadPrompt] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const [inputText, setInputText] = useState('');
  const [redactedText, setRedactedText] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    setUploadClicked(true)
    // Track click: upload_click_model_b
    console.log("Submit clicked - Model B")
  }

  const handleSubmitClick = async () => {
    if (!inputText || inputText.trim() === '') {
      setShowUploadPrompt(true);
      return; // Stop submission
    }
    setShowUploadPrompt(false); // Clear prompt if any
    handleUploadClick(); // or run your submission logic here
    setShowNextButton(true); // Show the next button
    setSubmitted(true);

    await TrackSubmitClick()
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileText = event.target.result;
      setInputText(fileText); // populate the input text for UI
      setSubmitted(false); // re-enable the submit button
      setShowUploadPrompt(false); // Clear prompt if any
      setUploadClicked(false)
      setShowNextButton(false); // Show the next button

      // Trigger redaction
      setLoading(true);
      try {
        const response = await fetch('https://backend-pii-redactor-1.onrender.com/redact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: fileText }),
        });

        const data = await response.json();
        setRedactedText(data.redacted_text);
      } catch (error) {
        console.error('Redaction failed:', error);
      } finally {
        setLoading(false);
      }
    };

    reader.readAsText(file);
  };

  const scrollToSection1 = () => {
    const section = document.getElementById('trust-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' }); // 'smooth' for a smooth scroll animation
    }
  };

  const scrollToSection2 = () => {
    const section = document.getElementById('feedback-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' }); // 'smooth' for a smooth scroll animation
    }
  };
  

  const TrackUploadClick = async () => {
    const analytics = await getAnalyticsInstance()
    if (analytics) {
      logEvent(analytics, "chat_upload_click", {
        label: "chat_upload_click",
      })
    } else {
      console.warn("Analytics is not supported")
    }
  }

  const TrackSubmitClick = async () => {      //Signals follow-through after using the upload/redaction demo. Very useful for conversion funnel analysis.
    const analytics = await getAnalyticsInstance()
    if (analytics) {
      logEvent(analytics, "chat_uploaded_and_submitted_click", {
        label: "chat_uploaded_and_submitted_click",
      })
    } else {
      console.warn("Analytics is not supported")
    }
  }

  const TrackEarlyInterestClick = async () => {   //Tracks curiosity and intent to scroll or explore beyond the hero section.
    const analytics = await getAnalyticsInstance()
    if (analytics) {
      logEvent(analytics, "Learn_more_button", {
        label: "Learn_more_button",
      })
    } else {
      console.warn("Analytics is not supported")
    }
  }


  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="icon-container">
            <div className="icon-circle">
              <img src="./favicon.ico" className="companylogo"></img>
            </div>
            
          </div>

          <h1 className="hero-title">
            Earn rewards for securely sharing <span className="highlight">anonymised chat data</span>
          </h1>

          <p className="hero-subtitle">Help businesses make smarter decisions. Your data, your control.</p>

          <button className="cta-button" onClick={() => {scrollToSection1(); TrackEarlyInterestClick()}}>
            <span className="icon"></span> Learn More
          </button>

          <div className="upload-demo">
            <div className="upload-card">
              <div className="upload-icon"></div>

              <div>
                <h3>Test the Experience</h3>
                <p>See how our upload process works with a simulation</p>
              </div>

              <button className="upload-button" onClick={() => {fileInputRef.current.click(); TrackUploadClick()}} disabled={loading}>
                {loading ? 'Anonymizing...' : 'Upload file & Check Anonymization'}
              </button>
              <input
                type="file"
                accept=".txt"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
              
            </div>
            <div className="redactor-container">
              <div className="text-box">
                <h4 className="box-title">Your Uploaded Chat</h4>
                <div className="preredacted-text" style={{ whiteSpace: 'pre-wrap' }}>
                  {inputText || <span style={{ color: '#999' }}>Upload a file...</span>}
                </div>
              </div>

              <div className="text-box">
                <h4 className="box-title">Your Anonymized Uploaded Chat</h4>
                <div className="redacted-text">
                  {redactedText && (
                    <>
                      <p>{redactedText}</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="upload-card">
              <div className="upload-icon"></div>

              <div>
                <h3>Confirmation</h3>
                <p>Click to submit</p>
              </div>

              <button className={`upload-button ${submitted ? 'submitted' : ''}`} onClick={handleSubmitClick} disabled={submitted}>
                {submitted ? 'Submitted' : 'Submit'}
              </button>
              
              {showUploadPrompt && (
                <div className="upload-prompt-text" style={{ color: 'red', marginTop: '8px' }}>
                  Please upload a file or paste your chat text before submitting.
                </div>
              )}
              {uploadClicked && (
                <div className="track-badge">
                  {"Thanks for trying out our anonymization feature!\nNo data is stored\nWe’d love your feedback on how we can improve."}
                </div>)}

              {showNextButton && (
                <button className="to-feedback-button" onClick={scrollToSection2}>
                  Continue
                </button>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* Trust & Privacy Section */}
      <TrustandPrivacy></TrustandPrivacy>

      {/* How It Works Section */}
      <HowItWorks></HowItWorks>

      {/* Feedback Section */}
      <FeedbackSection></FeedbackSection>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2025 PrivateBytes. Your privacy, your control.</p>
        </div>
      </footer>
    </div>
  )
}
