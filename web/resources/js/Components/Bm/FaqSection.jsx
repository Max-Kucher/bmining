import React from "react";

const faqList = [
    {
        title: "How much do I need for investing?",
        text: "In order to start investing, you will need an email address and a minimum deposit of $250."
    },
    {
        title: "What returns I can expect?",
        text: "The estimated monthly return is around 12%, with an annual return of 144%. The profit amounts may vary depending on market conditions, but the fluctuations are insignificant compared to the projected returns."
    },
    {
        title: "What are the highest yield and is there any limits?",
        text: "The highest yield that you can get on our platform, considering all the bonuses, is 28.8%. There is no upper limit on the amount of funds that you can invest; you can invest any amount on our service."
    },
    {
        title: "How often can I withdraw my funds?",
        text: "The principal amount of your deposit is frozen and can be withdrawn after a year upon closing the account. However, you can withdraw the interest earned on your account anytime after a week from the start of the investment."
    },
    {
        title: "How do bonuses work in Advanced and Expert modes?",
        text: "When you deposit a large sum of money, we give you a bonus on the deposit. For example, if you invest $10,000, we immediately give you a bonus of 25%. The amount of your deposit immediately becomes equal to $10,000*125% = $12,500 (25% is your bonus upon replenishment). Then, a monthly profit of 12% is accrued on this amount throughout the year. $12,500*112% = $14,000 will be in your account at the end of the month if you do not withdraw the interest from the account during the whole period."
    },
    {
        title: "What security measures are taken to keep my assets safe?",
        text: "We use two-factor authentication, data encryption, secure servers, SMS notifications, and the ability to personally identify you through your passport data. Please do not share your app and email passwords with anyone to avoid data leakage"
    },
    {
        title: "Will I get a tax deduction?",
        text: "Yes, you are eligible for the standard tax deduction at the end of the year. Don't forget to include this in your tax return. You can get help with taxes from your personal manager via live chat or email."
    },
    {
        title: "Do I need a VPN to work with the app?",
        text: "VPN is not required. However, if you use it, you may experience interruptions in the application's operation. In this case, log in using SMS confirmation or contact technical support."
    },
]

const FaqSection = ({faqRef}) => {
    const [openFaq, setOpenFaq] = React.useState(Array(faqList.length).fill(false));
    const [openFaqSec, setOpenFaqSec] = React.useState(Array(faqList.length).fill(false));

    const handleToggle = (index) => {
        const newIsOpen = [...openFaq];
        newIsOpen[index] = !newIsOpen[index];
        setOpenFaq(newIsOpen);
    };

    const handleToggleSec = (index) => {
        const newIsOpen = [...openFaqSec];
        newIsOpen[index] = !newIsOpen[index];
        setOpenFaqSec(newIsOpen);
    };

    return (
        <>
            <section ref={faqRef} className="qa" id="qa">
                <h2 className="blue">FAQ</h2>
                <div className="table">
                    <div className="table-half">
                        {
                            faqList.slice(0, 4).map((item, index) => (
                                <div key={item.title} className="qw">
                                    <div onClick={() => handleToggle(index)} className={`${index % 2 === 0 ? 'blue-bg' : ''} qw-vid`}>
                                        <p>{item.title}</p>
                                        <img className="keyDrop" src="/assets/icons/faq-icon-1.svg" alt=""/>
                                    </div>
                                    {
                                        openFaq[index] &&
                                        <p className={`vid qw animate__animated`}>{item.text}</p>
                                    }

                                </div>
                            ))
                        }

                    </div>
                    <div className="table-half">

                        {
                            faqList.slice(4, 8).map((item, index) => (
                                <div key={item.title} className="qw">
                                    <div onClick={() => handleToggleSec(index)} className={`${index % 2 === 0 ? '' : 'blue-bg'} qw-vid`}>
                                        <p>{item.title}</p>
                                        <img className="keyDrop" src="/assets/icons/faq-icon-1.svg" alt=""/>
                                    </div>
                                    {
                                        openFaqSec[index] &&
                                        <p className={`vid qw animate__animated`}>{item.text}</p>
                                    }

                                </div>
                            ))
                        }

                    </div>
                </div>
            </section>
        </>
    )
}
export default FaqSection;
