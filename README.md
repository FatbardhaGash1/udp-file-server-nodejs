# udp-file-server-nodejs
Një sistem client-server i implementuar në Node.js duke përdorur protokollin UDP, që mbështet lidhje të shumëfishta të klientëve, operacione mbi file-t, menaxhim të privilegjeve dhe trajtim automatik të klientëve joaktivë. Përfshin një HTTP server paralel për monitorim në kohë reale të lidhjeve aktive.

Technologjite e perdorura
Node.js
UDP (dgram module)
HTTP module
File System
JavaScript (ES6)

Serveri mbështet këto funksionalitete:
-Network Configuration
IP adresa dhe porti janë të definueshëm në server.js
-Client Management
Menaxhon lidhjet e klientëve
Limit i klientëve aktiv: 4 klientë
Refuzon klientët e rinj kur serveri është full
Identifikon admin (klienti i parë)
-Message Handling
Lexon mesazhet nga klientët UDP
Ruajti mesazhet për monitorim
Mban historik të mesazheve (deri 100)
-Timeout System
Klientët që nuk dërgojnë mesazhe brenda 15 sekondave
largohen automatikisht nga serveri
Mund të rikthehen duke u rilidhur
-File Management System
Ku serveri mbështet operacionet:
/list – liston file-at
/read <file> – lexon file
/upload <file> – ngarkon file (admin only)
/download <file> – shkarkon file
/delete <file> – fshin file (admin only)
/search <keyword> – kërkim në file
/info <file> – tregon info për file
-HTTP Monitoring Server


Client Features:
-Connection
Lidhet me serverin përmes UDP socket
IP dhe port janë të konfiguruar

-Command Support
Klientët mund të dërgojnë komanda:
/list
/read <file>
/upload <file>
/download <file>
/delete <file>
/search <keyword>
/info <file>

-Permission System
1 klient = Admin (full access)
klientët tjerë = read-only access
Admin mund të:
upload file
delete file

-Response Handling
Klienti lexon përgjigjet nga serveri në kohë reale
Input përmes terminalit