import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateHTML(data) {
  let html = `<h2>${data.type} - ${data.type_rengjøring}</h2>`;

  for (const property in data) {
    if (data.hasOwnProperty(property)) {
      const keyWithoutUnderscore = property.replace(/_/g, '');

      if (Array.isArray(data[property])) {
        html += `<p><b>${keyWithoutUnderscore}:</b></p>`;
        html += `<ul>`;
        for (const item of data[property]) {
          html += `<li>${item}</li>`;
        }
        html += `</ul>`;
      } else if (typeof data[property] === 'object') {
        html += `<p><b>${keyWithoutUnderscore}:</b></p>`;
        for (const subProperty in data[property]) {
          if (data[property].hasOwnProperty(subProperty)) {
            const subKeyWithoutUnderscore = subProperty.replace(/_/g, '');
            html += `<p>&nbsp;&nbsp;<b>${subKeyWithoutUnderscore}:</b> ${data[property][subProperty]}</p>`;
          }
        }
      } else {
        html += `<p><b>${keyWithoutUnderscore}:</b> ${data[property]}</p>`;
      }
    }
  }

  return html;
}
