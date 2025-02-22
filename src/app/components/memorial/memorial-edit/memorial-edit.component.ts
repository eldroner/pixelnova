import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MemorialService } from '../../../services/memorial.service';

@Component({
  selector: 'app-memorial-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './memorial-edit.component.html',
  styleUrls: ['./memorial-edit.component.scss']
})
export class MemorialEditComponent implements OnInit {
  memorial: any = {
    name: '',
    surname: '',
    description: '',
    birthDate: '',
    deathDate: '',
    videoUrl: '',
    publicVideo: true
  };

  constructor(
    private route: ActivatedRoute,
    private memorialService: MemorialService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const memorialId = this.route.snapshot.paramMap.get('id');
    if (memorialId) {
      this.memorialService.getMemorialById(memorialId).subscribe({
        next: (data) => this.memorial = data,
        error: (err) => console.error('Error al cargar el memorial:', err)
      });
    }
  }

  updateMemorial(): void {
    this.memorialService.updateMemorial(this.memorial).subscribe({
      next: () => {
        alert('✅ Memorial actualizado correctamente.');
        this.router.navigate(['/memorial', this.memorial._id]);
      },
      error: (err) => console.error('❌ Error al actualizar el memorial:', err)
    });
  }
  
  
}
