import './ConfirmationDialog.css';
interface Prop{
    onConfirm:()=> void;
    onCancel:()=>void;
}
const ConfirmationDialog = ({ onConfirm, onCancel }:Prop) => {
  return (
    <div className="overlay">
      <div className="confirmation-dialog">
        <h2>Confirmation</h2>
        <p>Are you sure you want to place an order?<br/>
            Once it's placed, it cannot be undone.</p>
        <div className="button-group">
          <button className="cancel-btn" onClick={onCancel}>No</button>
          <button className="confirm-btn" onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
