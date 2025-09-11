import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({children, open, className = '', onClose}) {
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;
        if(open) {
            modal.showModal();
        }
        return() => modal.close();
    },[open])
    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
            {children}
        </dialog>,
        document.getElementById("modal")
    );
}
















// export default function Modal({ open, onClose, children }) {
//   if (!open) return null; // if not open, render nothing

//   return createPortal(
//     // 1) This is the content
//     <div
//       onClick={onClose}
//       style={{
//         position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
//         display: "flex", justifyContent: "center", alignItems: "center",
//       }}
//     >
//       {/* stop clicks from bubbling to the backdrop */}
//       <div onClick={e => e.stopPropagation()}
//            style={{ background: "#fff", padding: 20, borderRadius: 8, color : "red" }}>
//         {children}
//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>,

//     // 2) This is the target element (outside root)
//     document.body
//   );
// }
