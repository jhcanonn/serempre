# serempre
CRUD y manejo de sesiones en Mysql.

# Extensiones necesarias de PHP:

1. sudo apt-get update
2. sudo apt-get install php7.2-mbstring php7.2-xml php7.2-zip

# Instalar dependencias con composer:

1. Descargar 'Latest Snapshot' de composer en https://getcomposer.org/download/
2. php composer.phar install

# Base de Datos MySQL

1. Ejecutar sentencias SQL que se encuentran en el archico Scripts/scheme.sql
2. Ejecutar Scripts/loadCities.php para cargar ciudades en la base de datos
3. Configurar archivo App/Models/Database.php con la conexion correcta a la base de datos