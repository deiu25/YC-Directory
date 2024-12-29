Remove-Item -Recurse -Force .\node_modules
Remove-Item -Force .\package-lock.json

npm install next@^15.1.1-canary.22 --force
npm install --legacy-peer-deps



npm ls next


npm install markdown-it --save-exact --legacy-peer-deps

Prevenirea acestor probleme pe viitor
Izolarea problemelor: Utilizează comanda npm install --dry-run înainte de a instala un pachet nou pentru a vedea ce modificări vor fi făcute în dependențe.

Gestionează versiunile cu grijă: Blochează explicit versiuni de pachete esențiale, cum ar fi next, pentru a preveni actualizările automate care pot duce la conflicte.

Utilizează npm dedupe: După orice instalare, rulează comanda:

```
npm dedupe
```
Aceasta elimină instanțele redundante ale modulelor și reduce conflictele.

npm i next@canary