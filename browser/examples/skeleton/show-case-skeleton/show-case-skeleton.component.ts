import { Component } from '@angular/core';
import { SkeletonComponent } from '@/ui/skeleton/skeleton.component';

@Component({
  selector: 'doc-show-case-skeleton',
  imports: [SkeletonComponent],
  templateUrl: './show-case-skeleton.component.html',
  styleUrl: './show-case-skeleton.component.css',
})
export class ShowCaseSkeletonComponent {}
