import React from 'react';
import EvalHeader from '../../components/EvalHeader/EvalHeader';
import EvalContent from '../../components/EvalContent/EvalContent';
import './Evaluation.css';

function Evaluation(props){
  return(
    <div className="evaluation-container">
        <EvalHeader />
        <EvalContent history={props.history}/>
        <div className="footer-svg" style={{height:'200px'}} ><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height:'100%', width:'100%'}}><path d="M-92.83,57.72 C137.97,99.17 406.59,-91.28 564.61,81.41 L500.00,150.00 L0.00,150.00 Z" style={{stroke:'none', fill:'#3c8cb5'}}></path></svg></div>
    </div>
  )
}

export default Evaluation;
