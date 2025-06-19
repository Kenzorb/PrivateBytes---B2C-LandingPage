import { useState, useRef } from "react"
import "./styles.css"

export default function LandingPage() {
  const [uploadClicked, setUploadClicked] = useState(false)
  const [comfort, setComfort] = useState("")
  const [concerns, setConcerns] = useState("")
  const [trust, setTrust] = useState("")
  const [email, setEmail] = useState("")

  const [inputText, setInputText] = useState('');
  const [redactedText, setRedactedText] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    setUploadClicked(true)
    // Track click: upload_click_model_b
    console.log("Upload clicked - Model B")
  }

  const handleFeedbackSubmit = (e) => {
    e.preventDefault()
    console.log("Feedback submitted:", { comfort, concerns, trust, email })
    alert("Thank you for your feedback!")
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileText = event.target.result;
      setInputText(fileText); // populate the input text for UI

      // Trigger redaction
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5050/redact', {
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
  

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="icon-container">
            <div className="icon-circle">
              <div className="icon-group">
                <span className="icon">🔒</span>
                <span className="icon">💬</span>
                <span className="icon">📈</span>
              </div>
            </div>
            <div className="check-badge">✓</div>
          </div>

          <h1 className="hero-title">
            Earn rewards for securely sharing <span className="highlight">anonymised chat data</span>
          </h1>

          <p className="hero-subtitle">Help businesses make smarter decisions. Your data, your control.</p>

          <button className="cta-button" onClick={scrollToSection1}>
            <span className="icon"></span> Learn More
          </button>

          <div className="upload-demo">
            <div className="upload-card">
              <div className="upload-icon"></div>

              <div>
                <h3>Test the Experience</h3>
                <p>See how our upload process works with a simulation</p>
              </div>

              <button className="upload-button" onClick={() => fileInputRef.current.click()} disabled={loading}>
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

              <button className="upload-button" onClick={handleUploadClick}>
                Submit!
              </button>
              

              {uploadClicked && <div className="track-badge">Thanks for trying out our chat anonymization feature. Please feel free to leave your feedback below.</div>}
            </div>

          </div>

        </div>
      </section>

      {/* Trust & Privacy Section */}
      <section className="trust-section" id="trust-section">
        <div className="container">
          <div className="section-header">
            <h2>Your Privacy is Our Priority</h2>
            <p>We never store names, numbers, or timestamps. You stay fully anonymous.</p>
          </div>

          <div className="card-grid">
            <div className="card">
              <div className="card-icon blue">🔒</div>
              <h3>Data Anonymised</h3>
              <p>All personal identifiers are removed before processing</p>
            </div>

            <div className="card">
              <div className="card-icon green">📊</div>
              <h3>Only Insights Shared</h3>
              <p>We share patterns and trends, never your actual messages</p>
            </div>

            <div className="card">
              <div className="card-icon red">🗑️</div>
              <h3>Delete Anytime</h3>
              <p>You have full control to remove your data whenever you want</p>
            </div>
          </div>

          {/* Preview Block for Model B */}
          <div className="preview-block">
            <h3>Example of Anonymised Data</h3>
            <div className="code-block">
              <div className="original-text">Original: "Hey <span id="highlight-text-yellow">John</span>, can you send the report to my office at <span id="highlight-text-yellow">391A Orchard Road #26-01</span> by 3pm?"</div>
              <div className="arrow">↓</div>
              <div className="anonymised-text">Anonymised: "Hey <span id="highlight-text-yellow">Person1</span>, can you send the report to my office at <span id="highlight-text-yellow">[pii]</span> by 3pm?"</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <h2>How It Works</h2>

          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Upload Your Chat File</h3>
              <p>Export your chat history from WhatsApp, Telegram, or other platforms and upload it securely</p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <h3>Data Gets Anonymised</h3>
              <p>Our system removes all personal information — no names, numbers, or timestamps are saved</p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <h3>Earn Rewards</h3>
              <p>Get tokens or cash when your anonymised data helps generate valuable business insights</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="upload-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>

          <div className="upload-card">
            <div className="upload-icon">⬆️</div>

            <div>
              <h3>Test the Experience</h3>
              <p>See how our upload process works with a simulation</p>
            </div>

            <button className="upload-button" onClick={handleUploadClick}>
              Simulate Upload
            </button>

            {uploadClicked && <div className="track-badge">Thanks for trying out our chat anonymization feature. Please feel free to leave your feedback below.</div>}
          </div>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="feedback-section">
        <div className="container">
          <div className="form-card">
            <div className="form-header">
              <h2>We'd Love Your Feedback</h2>
              <p>Help us improve the experience by sharing your thoughts</p>
            </div>
            <div className="form-body">
              <form onSubmit={handleFeedbackSubmit}>
                <div className="form-group">
                  <label>How comfortable would you feel using this flow?</label>
                  <div className="radio-group">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <label key={num} className="radio-label">
                        <input
                          type="radio"
                          name="comfort"
                          value={num.toString()}
                          checked={comfort === num.toString()}
                          onChange={(e) => setComfort(e.target.value)}
                        />
                        <span>{num}</span>
                      </label>
                    ))}
                  </div>
                  <p className="help-text">1 = Not comfortable, 5 = Very comfortable</p>
                </div>

                <div className="form-group">
                  <label htmlFor="concerns">What concerns do you still have?</label>
                  <textarea
                    id="concerns"
                    value={concerns}
                    onChange={(e) => setConcerns(e.target.value)}
                    placeholder="Share any concerns or questions..."
                    rows={4}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="trust">What would increase your trust?</label>
                  <textarea
                    id="trust"
                    value={trust}
                    onChange={(e) => setTrust(e.target.value)}
                    placeholder="What would make you more confident in using this service?"
                    rows={4}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email (optional)</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>

                <button type="submit" className="submit-button">
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2024 DataShare. Your privacy, your control.</p>
        </div>
      </footer>
    </div>
  )
}
