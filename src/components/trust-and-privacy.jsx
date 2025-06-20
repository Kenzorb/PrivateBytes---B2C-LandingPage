export default function TrustandPrivacy() {

    return (
        <>
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
        </>
    )
}