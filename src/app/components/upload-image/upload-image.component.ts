import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent {
  // variable para almacenar el área de la mancha
  stainArea: number = 0;

  // Función para cargar la imagen y convertirla a canvas
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.onload = () => {
        // Crear el canvas
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx: any = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        // Obtener los datos del canvas
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const width = imageData.width;
        const height = imageData.height;

        /****Calcular el área de la mancha*****/
        // número de puntos aleatorios
        const n = 1000000;
        // contador de puntos dentro de la mancha
        let nai = 0;
        for (let i = 0; i < n; i++) {
          const x = Math.floor(Math.random() * width);
          const y = Math.floor(Math.random() * height);
          const index = (y * width + x) * 4;
          if (
            data[index] === 0 &&
            data[index + 1] === 0 &&
            data[index + 2] === 0
          ) {
            nai++;
          }
        }
        const wh = width * height;
        this.stainArea = Math.log(n) * (nai / n) * wh;
      };
      image.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
