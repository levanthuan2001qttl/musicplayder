// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $('header h2')
const author = $('header h4')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBnt = $('.btn-repeat');
const playlist = $('.playlist');

const PLAYER_STORAGE_KEY = 'F8_PLAYER';
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: {},
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function(key,value){
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config))
    },
    

    songs: [
       
        {
            name: "Phải Chăng Em Đã Yêu?",
            singer: "Junky San, RedT",
            path: './assets/mp3/PhaiChangEmDaYeu-JukySanRedT-6940932.mp3',
            image:
            "data:image/jpeg;base64,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"
        },
        {
            name: "Sợ Yêu",
            singer: "Đặng Nguyên Minh",
            path: './assets/mp3/SoYeuAcousticCover-DangNguyenMinh-6008063_hq.mp3',
            image:
                "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        },
        {
            name: "Độ Tộc 2",
            singer: " Masew, Độ Mixi, Phúc Du, V.A",
            path: './assets/mp3/DoToc2-MasewDoMixiPhucDuPhao-7064730.mp3',
            image:
                "./assets/img/dotoc.jfif"
        },
        {
            name: "Yêu Nhau Nhé Bạn Thân",
            singer: " Phạm Đinh Thái Ngân",
            path: './assets/mp3/Yeu Nhau Nhe Ban Than - Pham Dinh Thai N.mp3',
            image:
                "./assets/img/yeunhaunhebanthan.jfif"
        },
        {
            name: "This Way",
            singer: " Cara If NoWay",
            path: './assets/mp3/ThisWay-CARA-6607957.mp3',
            image:
                "./assets/img/thisway.jpg"
        },
        {
            name: "Cưới Thôi",
            singer: "MaSew Masiu Bray",
            path: './assets/mp3/CuoiThoi-MasewMasiuBRayTAPVietNam-7085648.mp3',
            image:
                "./assets/img/cuoithoi.jpg"
        },
        {
            name: "Dễ Đến Dễ Đi",
            singer: "Quang Hùng",
            path: './assets/mp3/De Den De Di - Quang Hung MasterD.mp3',
            image:
                "./assets/img/dedendedi.jfif"
        },
        {
            name: "3 1 0 7 - 2",
            singer: "Dương Nâu, Wn",
            path: './assets/mp3/31072-DuonggNauWn-6937818.mp3',
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
            name: "Cần Lắm",
            singer: "Trang Konverse",
            path: './assets/mp3/CanLam-TrangKonverse-5986765.mp3',
            image:
                "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
            name: "Chờ",
            singer: "Ngọc Trâm, Nguyễn Duy Anh",
            path: './assets/mp3/Cho-NguyenDuyAnhNgocTram-4640389.mp3',
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
            name: "Lần Cuối",
            singer: "Rhy Trương Luân",
            path: './assets/mp3/LanCuoi-RhyTruongLuanDick-5471489.mp3',
            image:
                "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
            name: "Ngủ",
            singer: "Đậu Đen",
            path: './assets/mp3/NguAcousticCover-DauDen-5413845.mp3',
            image:
                "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },

    ],


    render: function(){
        const html = this.songs.map((song,index) => {  
            return `
                <div class="song ${ index === this.currentIndex ? 'active': ''}" data-index = ${index}>
                    <div class="thumb" 
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>    
                 `   
    })
        playlist.innerHTML = html.join('')
    },


    defineProperties: function(){
        Object.defineProperty(this,'currentSong',{
            get: function(){
                return this.songs[this.currentIndex];
            }
        })
    },

  
    handlEvents: function() {
        const cdWidth = cd.offsetWidth
        const _this = this;

        // Xử lí CD quay và dừng
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
            ],{
                duration: 10000, //10 second
                iterations: Infinity
        })
        cdThumbAnimate.pause()

        // Xử lí phóng to thu nhỏ   CD
        document.onscroll = function() { 
            const newCdWidth = cdWidth - window.scrollY;
            cd.style.width = newCdWidth > 0? newCdWidth + 'px': 0;
            cd.style.opacity = newCdWidth/cdWidth
        }

        // Xử lí khi click Play
        playBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause();  
            }
            else {
                audio.play();
            }   
        }

        // khi nhạc được phát
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing')   
            cdThumbAnimate.play()
        }

        //khi nhạc dừng phát
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing')   
            cdThumbAnimate.pause()
        }

        //khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function(){
            if(audio.duration) {
                //audio.currentTime: so giay, audio.duration: tong thoi luong bai hat
                const progressPercent = (audio.currentTime/ audio.duration *100)
                 //console.log(progressPercent)
                progress.value = progressPercent
              //  progress.style.width = progressPercent + '%';
            }   
        }

        // xử lí khi tua nhạc
        progress.oninput = function(e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime
        }

        // khi next bai hat 
        nextBtn.onclick = function() {
            if(_this.isRandom){
                _this.playRamdomSong();
            }
            else{
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollActiveSong()
        }

        // khi prev bai hat 
        prevBtn.onclick = function() {
            if(_this.isRandom){
                _this.playRamdomSong();
            }
            else{
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollActiveSong()
        }

        // xu li ramdom 
        randomBtn.onclick = function(e) {
            if(_this.isRandom){
                randomBtn.classList.remove('active')
                _this.isRandom = false;
            }
            else{
                randomBtn.classList.add('active')
                _this.isRandom = true;
            }    
            _this.setConfig('isRandom',_this.isRandom)
        }

        //xu ly lap lai 1 bai hat
        repeatBnt.onclick = function() {
            if(_this.isRepeat){
                repeatBnt.classList.remove('active')
                _this.isRepeat = false;
            }
            else{
                repeatBnt.classList.add('active')
                _this.isRepeat = true;
            }    
            _this.setConfig('isRepeat',_this.isRepeat)

        }

        // xu ly next song khi audio ended
        audio.onended = function(){
            if(_this.isRepeat){
                audio.play();
            }
            else{
                nextBtn.click();
            }   
        }
        
        // lang nghe click vao playlist
        playlist.onclick = function(e){
            // xu li khi click vao bai hat
            const songNode = e.target.closest('.song:not(.active)')
            if(songNode || e.target.closest('.option')){
                //xu li khi lick vao bai hat
                if (songNode){
                   // console.log(songNode.getAttribute('data-index'))
                   _this.currentIndex = Number( songNode.getAttribute('data-index'));
                   _this.loadCurrentSong()
                   _this.render()
                   audio.play()   
                }
                //xu li khi click vao bai hat
                if(e.target.closest('.option')){
                }               
            }
        }
    },


    scrollActiveSong: function(){
        setTimeout(() => {
            $('.song.active').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
        }, 500)
    },


    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name;
        author.textContent = this.currentSong.singer;
        cdThumb.style.backgroundImage =` url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    loadConfig: function() {
        // this.isRandom = this.config.isRandom
        // this.isRepeat = this.config.isRepeat
        Object.assign(this,this.config)
    },

    nextSong: function(){
        this.currentIndex++;
        if( this.currentIndex >= this.songs.length ){
            this.currentIndex = 0
        }
        this.loadCurrentSong();
    },

    prevSong: function(){
        this.currentIndex--;
        if( this.currentIndex < 0 ){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong();
    },


    playRamdomSong: function(){
        let newIndex 
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while ( newIndex == this.currentIndex )
        this.currentIndex = newIndex;
        this.loadCurrentSong();  
    },


    start: function(){
        // gán cấu hình từ config vào ứng dụng
       this.loadConfig();

        // định nghĩa các thuộc tính cho Object
        this.defineProperties()

        //lắng nghe và xử lí sự kiện
        this.handlEvents()

        //tải thông tin bài hát đầu tiên khi chạy Ứng dụng
        this.loadCurrentSong()

        // hien thi list song
        this.render();  
       
        randomBtn.classList.toggle('active' , this.isRepeat)
        randomBtn.classList.toggle('active' , this.isRandom)
        
    }

}
app.start();
