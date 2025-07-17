import { useEffect, useState } from "react";
import { GrMoney } from "react-icons/gr";

const financialTips = [
  {
    tip: "Pay yourself first by saving before spending",
    quote:
      "Do not save what is left after spending; instead spend what is left after saving.",
    expert: "Warren Buffett",
    expertise: "Chairman & CEO, Berkshire Hathaway",
  },
  {
    tip: "Build an emergency fund to handle unexpected expenses",
    quote:
      "A big part of financial freedom is having your heart and mind free from worry about the what-ifs of life.",
    expert: "Suze Orman",
    expertise: "Personal Finance Expert & Author",
  },
  {
    tip: "Eliminate debt as quickly as possible",
    quote: "Debt erases freedom more surely than anything else.",
    expert: "Merryn Somerset Webb",
    expertise: "Financial Journalist & Author",
  },
  {
    tip: "Track your spending to stay on budget",
    quote:
      "Tracking your spending is the number one secret to staying on top of your budget.",
    expert: "Dave Ramsey",
    expertise: "Radio Host & Financial Author",
  },
  {
    tip: "Focus on creating multiple income streams",
    quote:
      "Don't rely on your job for income, but instead focus on creating multiple streams of income through investments and business ventures.",
    expert: "Robert Kiyosaki",
    expertise: "Author of 'Rich Dad Poor Dad'",
  },
  {
    tip: "Invest with a long-term perspective",
    quote:
      "The stock market is a device for transferring money from the impatient to the patient.",
    expert: "Warren Buffett",
    expertise: "Chairman & CEO, Berkshire Hathaway",
  },
  {
    tip: "Understand the difference between assets and liabilities",
    quote:
      "It's not how much money you make, but how much money you keep, how hard it works for you, and how many generations you keep it for.",
    expert: "Robert Kiyosaki",
    expertise: "Author of 'Rich Dad Poor Dad'",
  },
  {
    tip: "Start investing early to benefit from compound interest",
    quote: "The rich invest in time, the poor invest in money.",
    expert: "Warren Buffett",
    expertise: "Chairman & CEO, Berkshire Hathaway",
  },
  {
    tip: "Build wealth through consistent saving habits",
    quote:
      "The habit of saving is itself an education; it fosters every virtue, teaches self-denial, cultivates the sense of order, trains to forethought, and so broadens the mind.",
    expert: "T.T. Munger",
    expertise: "Financial Author & Educator",
  },
  {
    tip: "Seek professional financial guidance",
    quote:
      "Financial security and independence are like a three-legged stool – savings, insurance, and investments.",
    expert: "Brian Tracy",
    expertise: "Business & Personal Development Author",
  },
];

const FinancialTips = () => {
  const [showQuote, setShowQuote] = useState(financialTips[0]);

  useEffect(() => {
    setInterval(() => {
      setShowQuote(
        financialTips[Math.floor(Math.random() * financialTips.length)]
      );
    }, 3000);
  }, []);

  const { tip, quote, expert } = showQuote;

  return (
    <div
      className="d-flex flex-column justify-content-center"
      style={{ height: "100%" }}
    >
      <div className="mb-5">
        <GrMoney className="text-success" style={{ fontSize: "10rem" }} />
        <div>Watch your Money Grow!</div>
      </div>
      <h4>{tip}</h4>
      <div className="fw-bolder">" {quote} "</div>
      <div> - {expert}</div>
    </div>
  );
};

export default FinancialTips;
