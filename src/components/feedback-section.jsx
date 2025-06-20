import { useState } from "react"
import { db } from "../config/firebase-config"
import { collection, addDoc } from "firebase/firestore"

export default function FeedbackSection() {

    const [comfort, setComfort] = useState("")
    const [concerns, setConcerns] = useState("")
    const [trust, setTrust] = useState("")
    const [email, setEmail] = useState("")
    const [errorMsg, setErrorMsg] = useState("") // 🆕 Add this line
    const [formSubmitted, setFormSubmitted] = useState(false)

    const feedbackCollectionRef = collection(db, "LandingPage_Feedback")

/*
    const handleFeedbackSubmit = (e) => {
        e.preventDefault()
        console.log("Feedback submitted:", { comfort, concerns, trust, email })
        alert("Thank you for your feedback!")
    }
*/
    const handleFeedbackSubmit = async (e) => {
        e.preventDefault()
        
        //validation
        if (!comfort || !concerns.trim() || !trust.trim()) {
            setErrorMsg("Please fill in all required fields.")
            // Auto-clear the error after 3 seconds
            setTimeout(() => setErrorMsg(""), 3000)
            return

        }

        try {
            await addDoc(feedbackCollectionRef, {
                Comfort_Level: comfort,
                Concerns: concerns,
                Increasing_Trust: trust,
                email: email
            })
            console.log("Submitted!")
        
            // Optional: reset form
            setComfort("")
            setConcerns("")
            setTrust("")
            setEmail("")

            setFormSubmitted(true) //hide form, show thank-you
        }
        catch(err) {
            console.error(err)
        }
        
    }


    return (
        <>

            {/* Feedback Form */}
            <section className="feedback-section" id="feedback-section">
                <div className="container">
                    
                    {formSubmitted ? (
                        <p className="thank-you-message" style={{ textAlign: "center",fontWeight: "bold", fontSize: "2rem", padding: "1rem", color: "green" }}>
                            Thank you for your feedback!
                        </p>
                    ) : (
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

                                {errorMsg && (
                                    <p className="error-message" style={{ color: "red", marginTop: "1rem" }}>
                                        {errorMsg}
                                    </p>
                                )}

                            </form>
                            </div>
                        </div>
                    )}


                    
                </div>
            </section>
        </>
    )
}