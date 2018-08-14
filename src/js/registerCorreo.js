// Registro
// Llamados al dom para registrar visitantes y enviar correo.
const form = document.getElementById('form');
const sectionToVisit = document.getElementById('section-to-visit');
const name = document.getElementById('name');
const secondName = document.getElementById('secondName');
const subject = document.getElementById('subject');
const email = document.getElementById('email');
const comeback = document.getElementById('comeback-button');
const goPh = document.getElementById('go-ph');
const sectionPhoto = document.getElementById('section-photo');
const save = document.getElementById('save');


// función que validar no ingreso de <>
// const datareview = () => {
// };

// funcion que guarda los datos del usuario
const userVisit = () => {
  let date = new Date();
  let userDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  let mail = email.value;
  let nameV = name.value;
  let secondNameV = secondName.value;
  let subjectV = subject.value;
  nameV = nameV.toUpperCase();
  secondNameV = secondNameV.toUpperCase();
  mail = mail.toLowerCase();

  if (nameV && secondNameV && subjectV && mail) {
    for (let i = 0; i < mail.length; i++) {
      if (mail[i] === '@') {
        // console.log(subjectV);
        // swal('bien');
        userData = {
          userId: userDate,
          Nombre: name.value,
          Apellido: secondName.value,
          Asunto: subject.value,
          correo: email.value,

        };
        return sendVisit(userData);
      }
    }
    swal('Correo invalido');
  } else {
    swal('Revise sus datos');
  }
};

// boton que acciona la funcion UserVisit
goPh.addEventListener('click', userVisit);


// boton que redirecciona de register al inicio
comeback.addEventListener('click', event => location.href = '../index.html');

const endRegister = () => {
  swal({
      title: '¡Anotado!',
      text: 'Se enviará un email a tu anfitrión para avisar de tu llegada, espera en recepción.',
      icon: 'success',
      buttons: true,
    })
    .then(buttons => {
      if (buttons === true) {
        location.href = '../index.html';
      }
    });
};

// TRABAJO DE DIANA
// FUNCION PARA LA SELECCION DE EMPLEADOS
const containeremployees = document.getElementById('employees-list');
document.addEventListener('DOMContentLoaded', () => {
  getData();
}, false);
const convertToArray = (data) => {
  return Object.values(data);
};

window.getData = () => {
  const url = '../../data/data.json';

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const arrayEmployees = convertToArray(data);
      listeners(arrayEmployees);
      drawEmployees(arrayEmployees);
    })
    // TEXTO QUE IMPRIME EL ERROR
    .catch(err => console.log('Error', err.message));
};
const drawEmployees = (array) => {
  let template = '';
  array.forEach((employees) => {
    console.log(employees);
    template += `<article class="item-employees">
              <div class="col s12 m12">
                  <div class="card horizontal">
                      <div class="card-image">
                          <div class="card-stacked">
                              <div class="card-content">
                  <p>${employees.nombre}</p>
                  <p>${employees.Apellido}</p>
                  <p>${employees.empresa}</p>
                  <button id="btn-enviar" class="offset-8 col-2 btn btn-dark">Enviar</button>
                              </div>
                          </div>
                      </div>
                  </div>
           </article>`;
  });
  containeremployees.innerHTML = template;
  const goEnd = document.getElementById('btn-enviar');
  goEnd.addEventListener('click', endRegister);
};
const goEnd = document.getElementById('btn-enviar');
const listeners = (array) => {
  const search = document.getElementById('search');
  search.addEventListener('keyup', () => {
    if (search.value.trim().length > 0) {
      const searching = search.value.toLowerCase();
      const filteredEmployees = array.filter((employees) => {
        return employees.nombre.toLowerCase().indexOf(searching) >= 0;
      });
      drawEmployees(filteredEmployees);
    }
    containeremployees.style.display = 'block';
  });
};

// funcion foto
let player = document.getElementById('player');
let snapshotCanvas = document.getElementById('snapshot');
let captureButton = document.getElementById('capture');
let photo = document.getElementById('photo');
let camera = document.getElementById('camera');
let videoTracks;

captureButton.style.display = 'none';

const handleSuccess = (stream) => {
  // Attach the video stream to the video element and autoplay.
  player.srcObject = stream;
  videoTracks = stream.getVideoTracks();
};
const photoshot = () => {
  let context = snapshot.getContext('2d');
  // Draw the video frame to the canvas.
  context.drawImage(player, 0, 0, snapshotCanvas.width,
    snapshotCanvas.height);
  // Stop all video streams.
  videoTracks.forEach((track) => {
    track.stop();
  });
  // player.style.display = 'none';
  photo.style.display = 'block';
  captureButton.style.display = 'none';
  save.style.display = 'block';
};

const goCamera = () => {
  navigator.mediaDevices.getUserMedia({
    video: true
  }).then(handleSuccess);
  captureButton.style.display = 'block';
  camera.style.display = 'none';
};

const photoSave = () => {
  /* ********** funcionalidad que extraiga foto para firebase***********/
  sectionPhoto.style.display = 'none';
  sectionToVisit.style.display = 'block';
  // goEnd.style.display = ('block');
};

camera.addEventListener('click', goCamera);
captureButton.addEventListener('click', photoshot);
save.addEventListener('click', photoSave);