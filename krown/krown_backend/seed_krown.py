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
    print("Début du remplissage de la base de données...")
    
    # 1. Services
    Service.objects.all().delete()
    Service.objects.create(
        title="Architecture Cloud & DevOps",
        description="Déploiement d'infrastructures hautement disponibles et sécurisées sur AWS et Azure.",
        category="tech"
    )
    Service.objects.create(
        title="Mentorat Leadership",
        description="Programme intensif pour transformer vos cadres en leaders visionnaires.",
        category="mentorship"
    )
    Service.objects.create(
        title="Gestion de Patrimoine",
        description="Optimisation de vos actifs immobiliers et conseils en investissement de luxe.",
        category="real_estate"
    )

    # 2. Academy
    Course.objects.all().delete()
    Course.objects.create(
        title="UI/UX Design Premium",
        description="Apprenez à créer des interfaces qui respirent le luxe et l'efficacité.",
        price=299.99
    )
    Course.objects.create(
        title="Mastering Django & React",
        description="Le guide complet pour bâtir des applications SaaS de niveau entreprise.",
        price=450.00
    )

    # 3. Immobilier
    Property.objects.all().delete()
    Property.objects.create(
        title="Penthouse Vue Fleuve",
        description="Un espace de vie exceptionnel au coeur de la ville avec finitions en marbre.",
        price=1500000,
        location="Kinshasa, Gombe"
    )

    # 4. Blog
    Post.objects.all().delete()
    admin = User.objects.filter(is_superuser=True).first()
    if admin:
        Post.objects.create(
            title="L'IA dans le Leadership Moderne",
            content="Comment l'intelligence artificielle redéfinit la prise de décision stratégique en 2026.",
            author=admin
        )

    # 5. Mentorat
    MentorshipProgram.objects.all().delete()
    MentorshipProgram.objects.create(
        title="Executive Mentorship 2026",
        description="Accompagnement VIP pour le lancement de votre prochaine licorne.",
        duration="6 mois",
        price=2500.00
    )

    print("Données insérées avec succès !")

if __name__ == '__main__':
    seed()
