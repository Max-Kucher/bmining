
const BmFooter = ({scrollToBlock, plansRef}) => {
    return (
        <>
            <footer className="footer">
                <div className="footer-left desc">
                    <h2>Smart investments for the well-being of your family and dear ones</h2>
                    <p className="copy">© Copyright 2024 GPT TRADE</p>
                    <p>I tading is a hign-reward and high-risk way of erning. The infomation presented on our website is
                        for
                        infomation purposes only and should not be considered as investment advice. Any investment ypu
                        make
                        are entirely yo responsibilite.</p>
                </div>
                <div className="footer-right desc">
                    <img src="/assets/footer.svg" alt=""/>
                    <div className="footer-urls">
                        <ul>
                            <li>
                                <h3>HELP</h3>
                            </li>
                            <li><a onClick={() => scrollToBlock(plansRef)} href="#">Contacts</a></li>
                            <li><a href="#">Support</a></li>
                        </ul>
                        <ul>
                            <li>
                                <h3>LEGAL</h3>
                            </li>
                            <li><a href="#">Privacy police</a></li>
                            <li><a href="#">Terms of use</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mob footer-left ">
                    <h2>Smart investments for the well-being of your family and dear ones</h2>
                    <div className="footer-urls">
                        <ul>
                            <li>
                                <h3>HELP</h3>
                            </li>
                            <li><a onClick={() => scrollToBlock(plansRef)} href="#">Contacts</a></li>
                            <li><a href="#">Support</a></li>
                        </ul>
                        <ul>
                            <li>
                                <h3>LEGAL</h3>
                            </li>
                            <li><a href="#">Privacy police</a></li>
                            <li><a href="#">Terms of use</a></li>
                        </ul>
                    </div>
                    <p>I tading is a hign-reward and high-risk way of erning. The infomation presented on our website is
                        for
                        infomation purposes only and should not be considered as investment advice. Any investment ypu
                        make
                        are entirely yo responsibilite.</p>
                    <p className="copy">© Copyright 2024 GPT TRADE</p>
                </div>
                <div className="mob footer-right ">
                    <img src="/assets/footer-mob.png" alt=""/>
                </div>
            </footer>
        </>
    )
}
export default BmFooter;
