
import { useState } from "react";
import "./PayementMethod.css";
import qrcode from "../../images/qrcode.png"
import { CartItem } from "../../types/types";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog"
const PaymentScreen = ({ cartItems }: { cartItems: CartItem[] }) => {
    const tele: any = window.Telegram.WebApp;
    const [showDialog, setShowDialog] = useState(false);

  const handleConfirm = () => {
    setShowDialog(false);
    
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

    // const showPopup = () => {
    //     if (tele) {
    //         tele.showPopup({
    //             title: "Payment Confirmation",
    //             message: "Do you want to proceed with the payment?",
    //             buttons: [
    //                 { id: "confirm", type: "ok", text: "Yes" },
    //                 { id: "cancel", type: "close", text: "No" }
    //             ],
    //             onClick: (buttonId: string) => {
    //                 if (buttonId === "confirm") {
    //                     console.log("User confirmed the payment");
    //                 } else if (buttonId === "cancel") {
    //                     console.log("User canceled the payment");
    //                 }
    //             }
    //         });
    //     } else {
    //         console.error("Telegram WebApp is not initialized.");
    //     }
    // };
    tele.MainButton.text = `Done`;
    tele.MainButton.show();
    tele.MainButton.onClick(() => {
        setShowDialog(true)

    });
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const vat = 0.00;
    return (
        <div className="payment-screen">
            <div className="payment-method">
                <h3><svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 1H3C1.89543 1 1 1.89543 1 3V12C1 13.1046 1.89543 14 3 14H17C18.1046 14 19 13.1046 19 12V3C19 1.89543 18.1046 1 17 1Z" stroke="#7882A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M1 5H18.5" stroke="#7882A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M5 10H7" stroke="#7882A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>&nbsp;
                    PAYMENT METHOD</h3>
                <div className="qr-section">
                    <div className="qr-container">
                        <img
                            src={qrcode}
                            alt="QR Code"
                            className="qr-code"
                        />
                    </div>
                    <div className="link-container">
                        <p>
                            <a href="https://pay.ababank.com/
                                      9zHdh4xMLXLFDg648" target="_blank" rel="noopener noreferrer">
                                https://pay.ababank.com/
                                9zHdh4xMLXLFDg648
                            </a><br></br>
                            <span>Account-holder name: <br />
                                LEU KONGSUN</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="order-summary">
                <div className="summery-head">
                    <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.4166 1.16667H3.58329C2.38668 1.16667 1.41663 2.09941 1.41663 3.25001V16.7917C1.41663 17.9423 2.38668 18.875 3.58329 18.875H14.4166C15.6132 18.875 16.5833 17.9423 16.5833 16.7917V3.25001C16.5833 2.09941 15.6132 1.16667 14.4166 1.16667Z" stroke="#7882A1" stroke-width="2" />
                        <path d="M5.75 6.375H12.25" stroke="#7882A1" stroke-width="2" stroke-linecap="round" />
                        <path d="M5.75 10.5417H12.25" stroke="#7882A1" stroke-width="2" stroke-linecap="round" />
                        <path d="M5.75 14.7083H10.0833" stroke="#7882A1" stroke-width="2" stroke-linecap="round" />
                    </svg>&nbsp;
                    <h3>

                        ORDER SUMMARY</h3>
                </div>
                <div className="items_container">
                    {cartItems.map((item) => (
                        <div className="row order-item">
                            <p>{item.quantity}x {item.title}</p>
                            <p>${(item.quantity * item.price).toFixed(2)}</p>
                        </div>
                    ))}
                </div>
                <div className="total-container">
                    <div className="row subtotal">
                        <p>Subtotal</p>
                        <p>${total.toFixed(2)}</p>
                    </div>
                    <div className=" row vat">
                        <p>VAT</p>
                        <p>${vat.toFixed()}</p>
                    </div>
                    <div className="row total">
                        <p>Total (incl. VAT)</p>
                        <p>${(total + vat).toFixed(2)}</p>
                    </div>
                </div>
            </div>
            {showDialog && (
                <ConfirmationDialog onConfirm={handleConfirm} onCancel={handleCancel} />
            )}
        </div>
    );
};

export default PaymentScreen;
