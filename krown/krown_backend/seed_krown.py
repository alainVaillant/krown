import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from services.models import Service
from academy.models import Course
from real_estate.models import Property
from blog.models import Post
from mentorship.models import MentorshipProgram
from accounts.models import User

def seed():
    print("Mise à jour des données Bass Academy...")
    
    # Suppression des anciens cours
    Course.objects.all().delete()
    
    # Création des nouveaux cours spécifiés
    Course.objects.create(
        title="Maîtrise de la Guitare Basse - Niveau Loisir",
        description="Apprenez les bases du rythme, du groove et jouez vos morceaux préférés sans pression. Idéal pour se détendre après le travail.",
        category="bass",
        price=199.00
    )
    
    Course.objects.create(
        title="Bases de la Guitare Accompagnement",
        description="Maîtrisez les accords essentiels, les rythmiques de base et apprenez à accompagner n'importe quel chant.",
        category="acoustic",
        price=149.00
    )

    print("Données Bass Academy mises à jour avec succès !")

if __name__ == '__main__':
    seed()
