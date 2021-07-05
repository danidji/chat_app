export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


export function format(time) {
    let mins = ~~(time / 60);
    let secs = ~~(time - mins * 60);

    let ret = "";

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}


export function formatHeure(time) {
    let hrs = ~~(time / 3600); //équivalent à Math.floor(time/3600)
    let mins = ~~((time % 3600) / 60);
    let secs = ~~time % 60;

    // Rendu en  "1:01" or "4:03:59" or "123:03:59"
    let ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

export function setIntervalTime(time, elt) {
    let cpt = 0;
    while (time > 0) {
        const interval = setInterval(() => {
            elt.textContent = cpt++;
            time--
        }, 1000)
    }
}

export function getFormatDate(timestamp) {

    let date = new Date(timestamp);

    const day = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    //Format des minutes avec 2chiffres => '05' 
    let minutes = '';
    date.getMinutes() < 10
        ? minutes = `0${date.getMinutes()}`
        : minutes = date.getMinutes()



    const format = {
        date: `le ${day[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`,
        heure: `${date.getHours()}:${minutes}`
    }

    return format
}