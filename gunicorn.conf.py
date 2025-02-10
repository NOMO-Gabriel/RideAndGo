# Nombre de workers (processus) recommandé
workers = 4

# Timeout en secondes
timeout = 120

# Port à utiliser (Render configurera automatiquement le PORT)
bind = "0.0.0.0:8000"

# Activer les logs
accesslog = '-'
errorlog = '-'

# Mode de travail recommandé
worker_class = 'sync'

# Nombre maximum de requêtes par worker avant redémarrage
max_requests = 1000
max_requests_jitter = 50

# Redémarrer les workers qui utilisent trop de mémoire (en octets)
worker_tmp_dir = '/dev/shm'
worker_max_memory_per_child = 250000000  # 250MB

# Préchargement de l'application
preload_app = True