
const PlansSection = () => {
    return (
        <>
            <section className="money">
                <h2><span className="blue">Our Investment</span> Plans </h2>
                <div className="money-top">
                    <div className="card">
                        <img className="abs1" src="/assets/icons/plan-icon-1.svg" alt="Standart 250$"/>
                        <div className="card-bg">
                            <h3>Plan 1</h3>
                            <h3 className="name blue">Standart 250$</h3>
                            <ul>
                                <li>&bull; Dividends withdrawal at any time</li>
                                <li>&bull; 12% monthly income</li>
                                <li>&bull; 144% annual income</li>
                                <li>&bull; 24/7 technical support</li>
                            </ul>
                            <p>*available for deposits of $ 250 or more</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="184" height="6" viewBox="0 0 184 6" fill="none">
                            <path
                                d="M2.40532 0.181835L181.591 0.181835C181.882 0.179615 182.17 0.246374 182.44 0.378232C182.709 0.51009 182.954 0.704456 183.16 0.950157C183.366 1.19586 183.53 1.48801 183.642 1.80984C183.753 2.13168 183.811 2.47685 183.811 2.82544C183.811 3.17481 183.753 3.52077 183.642 3.84355C183.53 4.16632 183.367 4.45958 183.161 4.70662C182.955 4.95367 182.71 5.14963 182.441 5.28333C182.171 5.41703 181.883 5.48584 181.591 5.48584L2.40532 5.48584C2.11452 5.48585 1.8266 5.41692 1.55811 5.28302C1.28961 5.14912 1.04585 4.95291 0.840866 4.70565C0.635895 4.45838 0.47374 4.16494 0.363739 3.84226C0.253738 3.51958 0.198044 3.17401 0.199905 2.82544C0.199905 2.12431 0.432251 1.45189 0.84584 0.956118C1.25945 0.460349 1.8204 0.181835 2.40532 0.181835Z"
                                fill="url(#paint0_linear_97_13)"/>
                            <defs>
                                <linearGradient id="paint0_linear_97_13" x1="169.116" y1="2.83386" x2="5.67735"
                                                y2="2.83386"
                                                gradientUnits="userSpaceOnUse">
                                    <stop stop-color="white"/>
                                    <stop offset="0.661839" stop-color="#7E93FF"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="card">
                        <img className="abs2" src="/assets/icons/plan-icon-2.svg" alt="Advanced 1,500$"/>
                        <div className="card-bg">
                            <h3>Plan 2</h3>
                            <h3 className="name">Advanced 1,500$</h3>
                            <ul>
                                <li>&bull; Dividends withdrawal at any time</li>
                                <li>&bull; 12% monthly income</li>
                                <li>&bull; 144% annual income</li>
                                <li>&bull; 24/7 technical support</li>
                                <li>&bull; 15% bonus on replenishment</li>
                            </ul>
                            <p>*available for deposits of $ 1,500 or more</p>
                        </div>
                        <img className="bord" src="/assets/icons/storie-line.svg" alt=""/>
                    </div>
                    <div className="card">
                        <img className="abs3" src="/assets/icons/plan-icon-3.svg" alt="Expert 5,000$"/>
                        <div className="card-bg">
                            <h3>Plan 3</h3>
                            <h3 className="name blue">Expert 5,000$</h3>
                            <ul>
                                <li>&bull; Dividends withdrawal at any time</li>
                                <li>&bull; 12% monthly income</li>
                                <li>&bull; 144% annual income</li>
                                <li>&bull; 24/7 technical support</li>
                                <li>&bull; VIP service</li>
                                <li>&bull; 25% bonus on replenishment</li>
                            </ul>
                            <p>*available for deposits of $ 5,000 or more</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="184" height="6" viewBox="0 0 184 6" fill="none">
                            <path
                                d="M2.40532 0.181835L181.591 0.181835C181.882 0.179615 182.17 0.246374 182.44 0.378232C182.709 0.51009 182.954 0.704456 183.16 0.950157C183.366 1.19586 183.53 1.48801 183.642 1.80984C183.753 2.13168 183.811 2.47685 183.811 2.82544C183.811 3.17481 183.753 3.52077 183.642 3.84355C183.53 4.16632 183.367 4.45958 183.161 4.70662C182.955 4.95367 182.71 5.14963 182.441 5.28333C182.171 5.41703 181.883 5.48584 181.591 5.48584L2.40532 5.48584C2.11452 5.48585 1.8266 5.41692 1.55811 5.28302C1.28961 5.14912 1.04585 4.95291 0.840866 4.70565C0.635895 4.45838 0.47374 4.16494 0.363739 3.84226C0.253738 3.51958 0.198044 3.17401 0.199905 2.82544C0.199905 2.12431 0.432251 1.45189 0.84584 0.956118C1.25945 0.460349 1.8204 0.181835 2.40532 0.181835Z"
                                fill="url(#paint0_linear_97_13)"/>
                            <defs>
                                <linearGradient id="paint0_linear_97_13" x1="169.116" y1="2.83386" x2="5.67735"
                                                y2="2.83386"
                                                gradientUnits="userSpaceOnUse">
                                    <stop stop-color="white"/>
                                    <stop offset="0.661839" stop-color="#7E93FF"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
                <button className="btn">Try Demo</button>
            </section>
        </>
    )
}
export default PlansSection;
