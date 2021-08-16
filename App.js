
import React, {useState} from 'react';
import {Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';

const App = ()  => {
  const [mostrarform, guardarMostrarForm] = useState(false);

  //Definir el state de citas
  const [citas, setCitas] = useState([
    {id:"1", paciente: "Hook", propietario: "Axel", sintomas: "No come"},
    {id:"2", paciente: "Redux", propietario: "Itzel", sintomas: "No duerme"},
    {id:"3", paciente: "Native", propietario: "Josue", sintomas: "No canta"}
  ]);

  const eliminarPaciente = id =>{
    setCitas((citasActuales) =>{
        return citasActuales.filter( cita => cita.id !== id );
    })
  }

 // Muestra u oculta el formulario
 const mostrarFormulario = () =>{
   guardarMostrarForm(!mostrarform)
 }


 // Ocultar el teclado
 const cerrarTeclado = () =>{
   Keyboard.dismiss();
 }



  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
      <Text style={styles.titulo}>Administrador de Citas</Text>

      <View>
          <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.btnMostrarForm}>
                <Text style={styles.textoMostrarForm}>{mostrarform ? 'Cancelar Crear Cita':'Crear Nueva Cita'}</Text>
          </TouchableHighlight>
      </View>

      <View style={styles.contenido}>
        { mostrarform ?(
          <>
           <Text style={styles.titulo}>Crear Nueva Cita</Text>
            <Formulario 
              citas={citas}
              setCitas = {setCitas}
              guardarMostrarForm={guardarMostrarForm}
            
            >
            </Formulario> 
          </>
        ) : (
          <>
            <Text style={styles.titulo}>{citas.length > 0 ? 'Administra tus citas': 'No hay citas, agrga una' }</Text>

            <FlatList
                style={styles.listado}
                data={citas}
                renderItem={({item}) => <Cita cita={item} eliminarPaciente={eliminarPaciente}/>}
                keyExtractor={cita => cita.id}
            />

          </>
        )}
      </View>

      {/* {citas.map(cita => (
        <View>
          <Text>{cita.paciente}</Text>
        </View>
      ))} */}
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor:{
    backgroundColor: '#122F4A',
    flex:1
  },
  titulo:{
    color:'#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  contenido:{
    flex: 1,
    marginHorizontal: '2.5%'
  },
  listado:{
    flex: 1,
  },
    btnMostrarForm:{
        padding: 10,
        backgroundColor: '#316593',
        marginVertical: 10
    },
    textoMostrarForm:{
        color:'#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    },

});

export default App;
