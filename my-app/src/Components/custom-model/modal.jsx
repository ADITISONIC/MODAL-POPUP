export default function Modal({ id, header, body, footer }) {
  return (
    <div id={id || "Modal"} className="modal">
      <div className="content">
        <div className="header">
          <span className="close-modal-icon">&times;</span>
          <h3>{header ? header : "Header"}</h3>
        </div>
        <div className="body">
          {body ? (
            body
          ) : (
            <div>
              <p>This is our modal body</p>
            </div>
          )}
        </div>
        <div className="footer">{footer ? footer : <h2>Footer</h2>}</div>
      </div>
    </div>
  );
}
