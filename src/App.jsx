import { useEffect, useState } from "react";

function App() {
	const [count, setCount] = useState(0);
  const [advice, setAdvice] = useState("");
  
	const getAdice = async () => {
		try {
			const res = await fetch("https://api.adviceslip.com/advice");
			const data = await res.json();

			if (!res.ok) throw new Error(`No advice found (${res.status})`);

			const { slip } = data;
			if (!slip) throw new Error(`No advice found`);

			setAdvice(slip.advice);
			setCount(slip.id);
		} catch (err) {
			setAdvice("Sorry failed to fetch advice, please check your network");
		}
  };
  
  useEffect(function () {
		getAdice();
	}, []);

	return (
		<main className="container">
			<section className="card">
				<h1 className="heading">
					<span>Advice</span>
					<span>
						#<span className="id">{count}</span>
					</span>
				</h1>
				<p className="advice">
					<q className="adv">{advice}</q>
				</p>
				<div className="divider"></div>
        <button
          className="btn"
          onClick={getAdice}
        >
					<img
						src="/assets/images/icon-dice.svg"
						alt="dice"
						className="btn__img"
					/>
				</button>
			</section>

			<section className="attribution">
				Challenge by{" "}
				<a
					href="https://www.frontendmentor.io?ref=challenge"
					target="_blank"
					rel="noreferrer"
				>
					Frontend Mentor
				</a>
        . Coded by{" "}
				<a
					href="https://www.linkedin.com/in/alfredthompsonovie/"
					target="_blank"
					rel="noreferrer"
				>
					Alfred Thompson Ovie
				</a>
				.
			</section>
		</main>
	);
}

export default App;
