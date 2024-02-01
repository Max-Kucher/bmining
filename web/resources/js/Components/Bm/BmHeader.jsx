import React from "react";

const BmHeader = ({scrollToBlock, homeRef, calcRef, plansRef, faqRef}) => {
    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            <div ref={homeRef} onClick={() => setShowModal(false)} className={`${showModal ? "modal-active" : ""} modal`} id="myModal">
                <div onClick={(e) => e.stopPropagation()} className="modal-content">
                    <span onClick={() => setShowModal(false)} className="close" id="closeModalBtn">&times;</span>
                    <nav>
                        <ul>
                            <li>
                                <a onClick={() => scrollToBlock(homeRef)} href="#">Home</a>
                            </li>
                            <li>
                                <a onClick={() => scrollToBlock(calcRef)} href="#">Сalculator</a>
                            </li>
                            <li>
                                <a onClick={() => scrollToBlock(plansRef)} href="#">Сontacts</a>
                            </li>
                            <li>
                                <a onClick={() => scrollToBlock(faqRef)} href="#">FAQ</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="header-btns">
                        <button type="button" className="login">LOGIN
                            <img src="/assets/icons/arrow-up.png" alt="LOGIN"/>
                        </button>
                        <button type="button" className="sign-up">SING UP
                            <img src="/assets/icons/arrow-up.png" alt="SING UP"/>
                        </button>
                    </div>
                </div>
            </div>
            <header className="header">
                <img src="/assets/b-logo.png " alt=""/>
                <nav className="navv">
                    <ul>
                        <li>
                            <a onClick={() => scrollToBlock(homeRef)} href="#">Home</a>
                        </li>
                        <li>
                            <a onClick={() => scrollToBlock(calcRef)} href="#">Сalculator</a>
                        </li>
                        <li>
                            <a onClick={() => scrollToBlock(plansRef)} href="#">Сontacts</a>
                        </li>
                        <li>
                            <a onClick={() => scrollToBlock(faqRef)} href="#">FAQ</a>
                        </li>
                    </ul>
                </nav>
                <div className="header-btns">
                    <button type="button" className="login">LOGIN
                        <img src="/assets/icons/arrow-up.png" alt="LOGIN"/>
                    </button>
                    <button type="button" className="sign-up">SING UP
                        <img src="/assets/icons/arrow-up.png" alt="SING UP"/>
                    </button>
                </div>
                <button onClick={() => setShowModal(true)} className="burger" id="openModalBtn">
                    <img className="mob" src="/assets/icons/bur.svg" alt="burger"/>
                </button>
            </header>
        </>
    )
}
export default BmHeader;
