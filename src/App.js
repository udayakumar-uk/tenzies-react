import React from 'react';
import './App.css';
import {nanoid} from "nanoid";
import TenizBox from './js/TenizBox';
import Wonbg from './img/won-bg.gif';
import YouWin from './img/you-won.gif';
import YouLost from './img/game-over.gif';

function App() {

  const [tenze, setTenze] = React.useState(Restart());
  const [won, setWon] = React.useState(false);
  const [lost, setLost] = React.useState(false);
  
  React.useEffect(() => {
    
    console.log(tenze);
    let checkAllTrue = tenze.every(ten => ten.isFreez === true);
    let checkAllVal = tenze.every(ten => ten.value === tenze[0].value);
    if(checkAllTrue && checkAllVal){
      setWon(true);
    }else if(checkAllTrue && !checkAllVal){
      setLost(true);
    }else{
      setWon(false);
      setLost(false);
    }
    console.log(checkAllVal);
  },[tenze]);


  function getRandomNum(){
    return Math.ceil(Math.random() * 9);
  }

  function createObj(index){
   return {
      id: nanoid(),
      value: getRandomNum(),
      isFreez: false
    }
  }



  function Roll(){

    if(won || lost){
      setTenze(Restart());
    }else{
      setTenze(tenz => tenz.map(ten => { 
        return ten.isFreez ? ten : createObj();
      }));
    }
  }


  function Restart(){
    var obj = [];
    for(var i=0; i < 10; i++){
      obj.push(createObj(i))
    }
    return obj;
  }

  function TenzEvent(id){
    setTenze(tenz => tenz.map(ten => { 
      return ten.id === id ? {...ten, isFreez: !ten.isFreez} : ten ;
    }));    
  }


  const tenzesLayout = tenze.map(ten => <TenizBox tenze={ten} key={ten.id} tenzClick={() => TenzEvent(ten.id)} />);
  

  return (
    <div className="App">
      {(won || lost)  &&  <img src={Wonbg}  className="won-bg"/>}

      {won && <img src={YouWin} className="winnerLoser" />}
      {lost && <img src={YouLost} className="winnerLoser" />}

      <div className="tenzi-parent">
        {tenzesLayout}
      </div>

      <div className='roll-button'>
        <button onClick={() => Roll()}>{(won || lost) ? 'Restart' : 'Roll'}</button>
      </div>
    </div>
  );
}

export default App;
