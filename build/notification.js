const btn = document.querySelector('#grid')

        btn.addEventListener('click', (evt) => {
            createNotification()
        })
    
        function createNotification() {
            let noti = document.createElement('div')
            let h3 = document.createElement('h3')
            let p = document.createElement('p')
            h3.innerHTML = '👍🏻 Successfully Copied!'
            p.innerHTML = 'Whoohoo! We hope you enjoy using the color! <br> <i>Check us out on Twitter! <a style="color: #fff; text-decoration: none;" href="https://twitter.com/colortopia" target="_blank">@colortopia</a>'
            noti.className = 'notification'
            noti.appendChild(h3)
            noti.appendChild(p)
            document.body.appendChild(noti)
            removeNotifications()
            setTimeout(() => {
                noti.classList.add('visible')
            }, 10);
    
            setTimeout(() => {
                noti.classList.add('remove')
                setTimeout(() => {
                    noti.remove()
                }, 300);
            }, 2500);
        }
    
        function removeNotifications() {
            const notifications = document.querySelectorAll('.visible')
            if (notifications.length > 0) {
                notifications.forEach((noti) => {
                    noti.classList.add('remove')
                    setTimeout(() => {
                        noti.remove()
                    }, 300);
                })
            }
        }