import React from "react";

const StepsSection = () => {
    const [rangeValue, setRangeValue] = React.useState(0);
    const [checkBonus, setCheckBonus] = React.useState(false);

    const handleRangeChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        setRangeValue(newValue);
    };

    return (
        <>
            <section className="second">
                <div className="second-top">
                    <h2><span className="blue">Easy</span> to start</h2>
                    <div className="blocks">
                        <div className="block">
                            <img src="/assets/icons/arrow-right.svg" className="abs" alt="Next step"/>
                            <div className="">
                                <h3>Step 1</h3>
                                <img src="/assets/icons/home-step-1.png" alt="Try for free"/>
                            </div>
                            <h4>Try for free</h4>
                            <p>Create an account in 1 minute using our web app and try a DEMO version without any
                                risk</p>
                        </div>
                        <div className="block">
                            <img src="/assets/icons/arrow-right.svg" className="abs" alt="Next step"/>
                            <div className="">
                                <h3>Step 2</h3>
                                <img src="/assets/icons/home-step-2.png" alt="Make a deposit"/>
                            </div>
                            <h4>Make a deposit</h4>
                            <p className="as">Choose a sum to put <br/> in trading. Your plan will be <br/> selected
                                automatically</p>
                        </div>
                        <div className=" mini block">
                            <div className="">
                                <h3>Step 3</h3>
                                <img src="/assets/icons/home-step-3.png" alt="Get your income"/>
                            </div>
                            <h4>Get your income</h4>
                            <p>Enjoy instant access to your income: withdraw anytime, day or night!</p>
                        </div>
                    </div>
                    <button className="btn">Invest in Your Dreams</button>
                </div>
                <div className="second-bottom">
                    <h2>How much <span className="blue">will I gain?</span></h2>
                    <div className="sliders">
                        <div className="sliders-left">
                            <h3>Investment amount in trading:</h3>
                            <div className="slider-container">
                                <input onChange={handleRangeChange} type="range" id="slider" min="0" max="10000" value={rangeValue} step="1"/>
                                <div className="valute">
                                    <div className="valutes">
                                        <p>USD</p>
                                        <input onChange={(e) => setRangeValue(parseInt(e.target.value, 10))} type="number" id="slider-input" min="0" max="10000" value={rangeValue > 10000 ? 10000 : rangeValue} />
                                    </div>
                                    <div className="valutes">
                                        <p>BTC</p>
                                        <input type="number" id="result-input" min="0" max="0.2300" value={(rangeValue * 0.000023).toFixed(4) > 0.2300 ? 0.2300 : (rangeValue * 0.000023).toFixed(4)}/>
                                    </div>
                                </div>
                                <div className="">
                                    <input type="checkbox" name="" id="bonus" checked={checkBonus} onChange={() => setCheckBonus(!checkBonus)}/>
                                    <label htmlFor="bonus">GET A BONUS</label>
                                </div>
                                <button className="btn">Unlock Your Earning Potential!</button>
                            </div>
                        </div>
                        <div className="sliders-right">
                            <h3>Your Plan: <span className="blue">{rangeValue > 5000
                                ? "Expert"
                                : rangeValue > 1500
                                    ? "Advanced"
                                    : rangeValue > 250
                                        ? "Standart"
                                        : "Start"}</span></h3>
                            <div className="slider-two">
                                <p className="f numbs">{parseInt(checkBonus ? rangeValue * 1.44 * 1.05 : rangeValue * 1.44 * 1).toFixed(2)}$</p>
                                <p className="s numbs">{parseInt(checkBonus ? rangeValue * 0.12 * 1.05 : rangeValue * 0.12 * 1).toFixed(2)}$</p>
                                <p className="t numbs">{parseInt(checkBonus ? rangeValue * 0.12 * 1.05 / 30 : rangeValue * 0.12 * 1 / 30).toFixed(2)}$</p>
                                <img src="/assets/calc-chart-bg.png" alt="Investment amount in trading"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default StepsSection;
