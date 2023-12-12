// Modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

// Pages
import './index.css';
import Homepage from './app/public/pages/Homepage';
import Signin from './app/public/pages/Signin';

// Modules
import Navbar from './app/public/modules/navbar';
import About from './app/public/pages/About';   

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path="/" element={
						<>
							<Navbar />
							<Homepage />
						</> 
					} />
					<Route path="about" element={
						<>
							<Navbar />
                            <About />
						</> 
					} />
					<Route path="signin" element={
						<>
							<Navbar />
							<Signin />
						</> 
					} />
			</Routes>
		</Router>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
