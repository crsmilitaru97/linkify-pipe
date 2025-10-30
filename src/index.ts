import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkify',
  standalone: true
})
export class LinkifyPipe implements PipeTransform {
  transform(text: string): string {
    if (!text) return '';

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const html = text.replace(urlRegex, (url) => {
      return `<a class="linkify" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
    return html;
  }
}