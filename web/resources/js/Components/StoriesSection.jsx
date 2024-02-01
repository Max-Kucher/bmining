
const StoriesSection = () => {
    return (
        <>
            <section className="revs">
                <h2>4 <span className="blue">stories</span></h2>
                <div className="revs-top">
                    <div className="card">
                        <img className="abs"
                             src="/assets/storie-cart-1.svg"
                             alt="Storie 1"/>
                        <div className="card-bg">
                            <h3>Peter</h3>
                            <p>Peter is a 26 years old man. He wants to make sure he has a financial safety net. He sets
                                aside a small portion of his monthly income in a home safe. His savings grow, but still
                                he
                                loses about 5% of his money to inflation each year.</p>
                        </div>
                        <img className="bord" src="/assets/icons/storie-line.svg" alt="Line"/>
                    </div>
                    <div className="card">
                        <img className="abs" src="/assets/storie-cart-2.svg"
                             alt="Storie 2"/>
                        <div className="card-bg">
                            <h3>Frank</h3>
                            <p>Frank, Peter's friend, chuckles at his financially illiterate buddy and keeps his savings
                                the
                                way he was taught in financial courses: in a bank deposit. He doesn't think at all that
                                the
                                interest on the deposit does not even cover inflation, and his money depreciates only
                                slightly slower than Peter's.</p>
                        </div>
                        <img className="bord" src="/assets/icons/storie-line.svg" alt="Line"/>
                    </div>
                    <div className="card">
                        <img className="abs" src="/assets/storie-cart-3.svg"
                             alt="Storie 3"/>
                        <div className="card-bg">
                            <h3>Julia</h3>
                            <p>Julia dreams of finally paying off her student loans and finally living a full life: a
                                car
                                and a dream house. She hired a broker, chose a company that occupied a leading position
                                in
                                the trading market, and mortgaged I spent all my savings in online trading and even
                                managed
                                to make good money. But the latest crisis led to the bankruptcy of the company and ate
                                it
                                all up investment, leaving the poor woman penniless and without a dream.</p>
                        </div>
                        <img className="bord" src="/assets/icons/storie-line.svg" alt="Line"/>
                    </div>
                </div>
                <div className="revs-bottom">
                    <div className="big-card">
                        <img className="abs"
                             src="/assets/storie-cart-4.svg"
                             alt="Storie 4"/>
                        <div className="card-bg">
                            <h3>Mark</h3>
                            <p>And this is Mark. Mark is an exemplary family man and dreams of doing everything so that
                                his
                                beautiful wife and two children do not need anything. He keeps his finger on the pulse
                                of
                                new technologies and knows that AI can handle data much better than humans. Therefore,
                                Mark
                                saved up money for several months and invested several thousand dollars in AI trading,
                                with
                                diversificated assets. Each month he withdraws a small percentage of his dividends to
                                please
                                his loved ones with gifts – and the main bulk of his capital continues to grow,
                                increasing
                                his income..</p>
                            <img src="/assets/icons/storie-line-2.svg" alt="Line"/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default StoriesSection;
