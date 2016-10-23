// html5media enables <video> and <audio> tags in all major browsers
// External File: http://api.html5media.info/1.1.8/html5media.min.js
/*global $*/

// Add user agent as an attribute on the <html> tag...
// Inspiration: http://css-tricks.com/ie-10-specific-styles/
$(document).ready(function(){
    var b = document.documentElement;
    b.setAttribute('data-useragent', navigator.userAgent);
    b.setAttribute('data-platform', navigator.platform);

// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
$(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            // Path to media here 
            mediaPath = './playlist/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "DJ Khaled ftDrake - For Free (OriginalAudio) HQ",
                "length": "03:02",
                "file": "DJKhaledftDrake-ForFree(OriginalAudio)HQ"
            }, {
                "track": 2,
                "name": "Eminem - Not Afraid",
                "length": "04:19",
                "file": "Eminem-NotAfraid"
            }, {
                "track": 3,
                "name": "Friday - Rebecca Black - Official Music Video",
                "length": "03:47",
                "file": "Friday-RebeccaBlack-OfficialMusicVideo"   
            }, {
                "track": 4,
                "name": "Gemini Syndrome-Resurrection Lyrics",
                "length": "03:54",
                "file": "GeminiSyndrome-ResurrectionLyrics"
            }, {
                "track": 5,
                "name": "Guns N' Roses - Welcome To The Jungle",
                "length": "04:35",
                "file": "GunsN'Roses-WelcomeToTheJungle"
            }, {
                "track": 6,
                "name": "Justin Bieber - Baby ft. Ludacris",
                "length": "03:45",
                "file": "JustinBieber-Babyft.Ludacris"
            }, {
                "track": 7,
                "name": "Luke Bryan - Huntin', Fishin' And Lovin' Every Day",
                "length": "04:31",
                "file": "LukeBryan-Huntin',Fishin'AndLovin'EveryDay"
            }, {
                "track": 8,
                "name": "Michael Jackson - Billie Jean",
                "length": "04:56",
                "file": "MichaelJackson-BillieJean"
            }, {
                "track": 9,
                "name": "PSY - GANGNAM STYLE(강남스타일) MV",
                "length": "05:46",
                "file": "PSY-GANGNAMSTYLE(강남스타일)MV"
            }, {
                "track": 10,
                "name": "TheChainsmokers - Closer (Lyric) ft. Halsey",
                "length": "04:22",
                "file": "TheChainsmokers-Closer(Lyric)ft.Halsey"
            }, {
                "track": 11,
                "name": "The Temptations - My Girl",
                "length": "02:43",
                "file": "TheTemptations-MyGirl"
            }, {
                "track": 12,
                "name": "Vance Joy - 'Riptide' Official Video",
                "length": "03:24",
                "file": "VanceJoy-'Riptide'OfficialVideo"
            }],
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).bind('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).bind('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});

});
