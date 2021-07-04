import React, { Component } from 'react';
import { ScrollView, Text, View, Button } from 'react-native';



class Cronometro extends Component {
  constructor(props){
    super(props);
      this.state = {
        horas: 0,
        minutos: 0,
        segundos: 0,
        ativo: false,
        voltas:[]
      }
      
      this.contadorDeClock = this.contadorDeClock.bind(this);
      this.iniciaClock = this.iniciaClock.bind(this);
      this.pararClock = this.pararClock.bind(this);
      this.marcarClock = this.marcarClock.bind(this);
      this.zerarDeClock = this.zerarDeClock.bind(this);    
    }

    iniciaClock(){
      if(!this.state.ativo){
        this.setState({clock: setInterval(this.contadorDeClock, 1000)});
        this.setState({ativo: true})
      }
    }

    contadorDeClock(){
      var h = this.state.horas;
      var m = this.state.minutos;
      var s = this.state.segundos;
      
      if ( s<59){
        s++;
      }else {
        s = 0;

        if(m < 59){
          m++;
        }else{
          m=0; 
          h++;
        }
      }

      this.setState({segundos : s, minutes: m, horas: h})      
    }

    pararClock(){
      if(this.state.ativo){
        clearInterval(this.state.clock);
        this.setState({ativo: false});
      }
    }   
  
    marcarClock(){
      var txtDoRelogio =" Registro de hora" + this.formatar(this.state.horas) + ":" + this.formatar(this.state.minutos) + ":" + this.formatar(this.state.segundos) + "\n";
      this.state.voltas.push(txtDoRelogio);
      this.forceUpdate();
    }

    formatar(t){
      return (t<10) ? "0"+t.toString() : t.toString();
    }

    zerarDeClock(){
      this.pararClock();
      this.setState({segundos:0,minutos:0, horas:0});
    
      if(this.state.voltas.length>0){
        this.state.voltas.push('--------- \n');        
      }
    }
  
    render()
    {
      var txtHora = this.formatar(this.state.horas);
      var txtMinuto = this.formatar(this.state.minutos);
      var txtSegundos = this.formatar(this.state.segundos);

      return(
        <ScrollView>
          <View>
            <Text>App Cronômetro</Text>
            <Text>{txtHora}:{txtMinuto}:{txtSegundos}</Text>
          </View>
          <View>
            <Button onPress={this.state.ativo ? this.pararClock: this.iniciaClock}
            title={this.state.ativo ? 'Pausar' : 'Vai!'} />
            <Button onPress={this.marcarClock} title='Salvar RELOGIO'/>
            <Button onPress={this.zerarDeClock} title='Zerar Relogio' />
          </View>
          <View>
            <Text>
              {this.state.voltas}
            </Text>
          </View>
        </ScrollView>
      )
    }
}

export default Cronometro;