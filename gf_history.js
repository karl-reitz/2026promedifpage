const { createApp } = Vue

createApp(
    {
        data() {
            return {
                grindel_frost_geschichte: [],
                currentEpocheId: 0,
                currentEpoche: null,
            }
        },
        methods: {
            selectEpoche(id) {
                this.currentEpocheId = id
                this.currentEpoche = this.grindel_frost_geschichte[id]
                speechSynthesis.cancel();
            },
            selectEpocheNext(id) {
                if (id < 4) {
                    this.currentEpocheId = ++id
                    this.currentEpoche = this.grindel_frost_geschichte[id++]
                    speechSynthesis.cancel();
                }
                window.scrollTo(0, 0);
            },

            play() {
                if (speechSynthesis.paused) {
                    speechSynthesis.resume();

                } else if (speechSynthesis.speaking) {
                    speechSynthesis.pause();

                } else {
                    const text = `
                    Überschrift: ${this.currentEpoche.titel}
                    <break time="1000ms"/>

                    ${this.currentEpoche.zitat.text}
                    <break time="1000ms"/>

                    ${this.currentEpoche.zitat.autor}
                    <break time="3000ms"/>

                    ${this.currentEpoche.geschichte}
                    `;
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.lang = "de-DE";
                    speechSynthesis.speak(utterance);
                }
            }
        },

        mounted() {
            fetch('content.xml')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('error loading XML ')
                    }
                    return response.text()
                })
                .then(xmlText => {
                    const parser = new DOMParser()
                    const xml = parser.parseFromString(xmlText, 'text/xml')


                    this.grindel_frost_geschichte = [...xml.querySelectorAll('epoche')].map(epoche => ({
                        id: epoche.getAttribute('id'),
                        titel: epoche.querySelector('titel')?.textContent,
                        zusammenfassung: epoche.querySelector('zusammenfassung')?.textContent,
                        von_bis: epoche.querySelector('von_bis')?.textContent,
                        zitat: {
                            text: epoche.querySelector('zitat > text')?.textContent,
                            autor: epoche.querySelector('zitat > autor')?.textContent,
                        },

                        historischer_kontext: epoche.querySelectorAll('historischer_kontext > fakt'),
                        unternehmens_kontext: epoche.querySelectorAll('unternehmens_kontext > fakt'),
                        steigeisen_name: epoche.querySelector('steigeisen > name')?.textContent,
                        steigeisen_text: epoche.querySelector('steigeisen > text')?.textContent,
                        geschichte: epoche.querySelector('geschichte')?.textContent,
                        teaser: epoche.querySelector('teaser')?.textContent,
                        image_description: epoche.querySelector('image_description')?.textContent,

                    }))

                    this.currentEpoche = this.grindel_frost_geschichte[0]
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }).mount('#gf_history_app')
