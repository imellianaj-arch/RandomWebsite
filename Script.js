script
     1. Fungsi untuk memuat foto dari Local Storage saat web dibuka
    function loadGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        galleryGrid.innerHTML = ''; 
        
         Ambil data dari Local Storage
        let photos = JSON.parse(localStorage.getItem('myGallery'))  [];

         Tampilkan setiap foto
        photos.forEach((photo, index) = {
            galleryGrid.innerHTML += `
                div class=gallery-item data-category=${photo.category}
                    img src=${photo.data} alt=Foto ${index}
                    button onclick=deleteFoto(${index}) style=position absolute; top 5px; right 5px; background red; color white; border none; border-radius 50%; width 25px; height 25px; cursor pointer; font-weight bold;Xbutton
                div
            `;
        });
    }

     2. Fungsi untuk mengunggah dan menyimpan foto
    function uploadFoto() {
        const fileInput = document.getElementById('imageInput');
        const category = document.getElementById('imgCategorySelect').value;

        if (fileInput.files.length === 0) {
            alert('Pilih foto dulu ya!');
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

         Konversi gambar jadi teks Base64 agar bisa masuk Local Storage
        reader.onload = function(e) {
            const imageData = e.target.result;
            
            let photos = JSON.parse(localStorage.getItem('myGallery'))  [];
            photos.push({ category category, data imageData });
            
            try {
                localStorage.setItem('myGallery', JSON.stringify(photos));
                alert('Foto berhasil disimpan!');
                loadGallery();  Refresh galeri
            } catch (error) {
                alert('Penyimpanan penuh! Local Storage membatasi ukuran file.');
            }
        };

        reader.readAsDataURL(file);
    }

     3. Fungsi untuk menghapus foto
    function deleteFoto(index) {
        if (confirm('Yakin ingin menghapus foto ini')) {
            let photos = JSON.parse(localStorage.getItem('myGallery'))  [];
            photos.splice(index, 1);  Hapus foto dari array
            localStorage.setItem('myGallery', JSON.stringify(photos));  Update Local Storage
            loadGallery();  Refresh galeri
        }
    }

     4. Jalankan loadGallery saat pertama kali web dibuka
    window.onload = loadGallery;
script