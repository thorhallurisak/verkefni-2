const synth = new Tone.Synth().toDestination(); 
let allTunes = [];  
let recordedTune = [];  

// Get DOM elements
const recordBtn = document.getElementById('recordbtn');
const stopBtn = document.getElementById('stopbtn');
const sound = document.getElementById("tunesDrop");


const getPeople = async () => {
    const url = 'http://localhost:3000/api/v1/tunes'; // API endpoint
    try {
        const response = await axios.get(url);
        populateSound(response.data);
        allTunes = response.data;
        console.log("Fetched tunes:", allTunes);
    } catch (error) {

        console.error("Failed to fetch tunes:", error);
    }
};

getPeople();

recordBtn.addEventListener('click', () => {
    recordBtn.disabled = true;
    stopBtn.disabled = false;
  });
  
stopBtn.addEventListener('click', () => {
    stopBtn.disabled = true;
    recordBtn.disabled = false;
  });

const PlayTune = (sound) => {
    const now = Tone.now();
        synth.triggerAttackRelease(sound, "8n", now);
        
        if (recordBtn.disabled) { 
            recordedTune.push({note: sound, duration: '8n', timing: now});
        }  
};

document.addEventListener('keydown', function (info) {
    const now = Tone.now();
    if (info.code == 'KeyA') {
        synth.triggerAttackRelease("c4", "8n", now); 
    }
    if (info.code == 'KeyW') {
        synth.triggerAttackRelease("c#4", "8n", now);
    }
    if (info.code == 'KeyS') {
        synth.triggerAttackRelease("d4", "8n", now);
    }
    if (info.code == 'KeyE') {
        synth.triggerAttackRelease("d#4", "8n", now);
    }
    if (info.code == 'KeyD') {
        synth.triggerAttackRelease("e4", "8n", now);
    }
    if (info.code == 'KeyF') {
        synth.triggerAttackRelease("f4", "8n", now);
    }
    if (info.code == 'KeyT') {
        synth.triggerAttackRelease("f#4", "8n", now);
    }
    if (info.code == 'KeyG') {
        synth.triggerAttackRelease("g4", "8n", now);
    }
    if (info.code == 'KeyY') {
        synth.triggerAttackRelease("g#4", "8n", now);
    }
    if (info.code == 'KeyH') {
        synth.triggerAttackRelease("a4", "8n", now);
    }
    if (info.code == 'KeyU') {
        synth.triggerAttackRelease("bb4", "8n", now);
    }
    if (info.code == 'KeyJ') {
        synth.triggerAttackRelease("b4", "8n", now);
    }
    if (info.code == 'KeyK') {
        synth.triggerAttackRelease("c5", "8n", now);
    }
    if (info.code == 'KeyO') {
        synth.triggerAttackRelease("c#5", "8n", now);
    }
    if (info.code == 'KeyL') {
        synth.triggerAttackRelease("d5", "8n", now);
    }
    if (info.code == 'KeyP') {
        synth.triggerAttackRelease("d#5", "8n", now);
    }
    if (info.code == 'Semicolon' || info.code == 'Comma') {
        synth.triggerAttackRelease("e5", "8n", now);
    }
    
});

const populateSound = (responseJson) => {
    responseJson.forEach((item) => {
      // create an option element for each item in the response
      let opt = document.createElement("option");
      opt.textContent = item.name;
      opt.value = item.name;
      // ad the items to the dropdown menu
      sound.appendChild(opt);
    });
  };

// plays the tune which is selected in teh drop downmenu
const PlayButton = () => {
    link = document.getElementById("tunesDrop").value;
    allTunes.forEach((tune) => {
      //   finds the correct tune by looking through the names
      if (tune.name == link) {
        tune.tune.forEach((note) => {
          synth.triggerAttackRelease(note.note, note.duration, Tone.now() + note.timing);
        });
      }
    });
  };


// adding a recorded song to the backend array
const displayInput = async () => {
    let songName = prompt("Please name the song");
    if (songName == '') {
        songName = 'No-name Tune'
    }
    if (recordedTune.length != 0) {
      // Create a new song object with the recorded tune and the given name
      const newSong = {
        name: songName,
        tune: recordedTune
      };
      try {
        // Make a POST request to the backend API to add the new song
        const response = await axios.post('http://localhost:3000/api/v1/tunes', newSong);
        console.log(response.data);
        // Add the new song to the allTunes array
        allTunes.push(newSong);
        // Add a new option to the dropdown menu with the song name
        let opt = document.createElement("option");
        opt.textContent = songName;
        opt.value = songName;
        sound.appendChild(opt);
        // Reset the recordedTune array
        recordedTune = [];
      } catch (error) {
        console.error(error);
      }
    }
  };
