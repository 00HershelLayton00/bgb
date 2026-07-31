#!/bin/bash
VERDE='\033[0;32m'
AMARILLO='\033[1;33m'
ROJO='\033[0;31m'
NC='\033[0m'

echo -e "${VERDE}📦 Empaquetando proyecto standalone...${NC}"

if [ ! -d ".next/standalone" ]; then
    echo -e "${ROJO}❌ No existe .next/standalone. Ejecuta: npm run build${NC}"
    exit 1
fi

CARPETA="compilada"
rm -rf "$CARPETA"
mkdir -p "$CARPETA"

# Copiar standalone
cp -r .next/standalone/* "$CARPETA/"
cp -r .next/standalone/.env "$CARPETA/" 2>/dev/null

# Copiar TODO .next (excepto standalone y node_modules)
mkdir -p "$CARPETA/.next"
cp -r .next/* "$CARPETA/.next/" 2>/dev/null
rm -rf "$CARPETA/.next/standalone"
rm -rf "$CARPETA/.next/node_modules"

# Copiar public
if [ -d "public" ] && [ "$(ls -A public 2>/dev/null)" ]; then
    cp -r public "$CARPETA/"
fi

# Crear script de inicio
cat > "$CARPETA/iniciar.sh" << 'EOSCRIPT'
#!/bin/bash
echo "🎬 Iniciando servidor multimedia..."

# Cargar .env si existe (solo para mostrar la ruta)
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Si no hay MULTIMEDIA_PATH definido, pedirlo
if [ -z "$MULTIMEDIA_PATH" ]; then
    echo "⚠️  No se ha definido MULTIMEDIA_PATH"
    read -p "📁 Ingresa la ruta completa a la carpeta multimedia: " MULTIMEDIA_PATH
    echo "MULTIMEDIA_PATH=$MULTIMEDIA_PATH" >> .env
fi

# Verificar que la carpeta existe
if [ ! -d "$MULTIMEDIA_PATH" ]; then
    echo "❌ ERROR: La carpeta $MULTIMEDIA_PATH no existe"
    echo "   Créala con: mkdir -p $MULTIMEDIA_PATH"
    exit 1
fi

echo "📁 Ruta multimedia: $MULTIMEDIA_PATH"
echo "🌐 Abre http://localhost:3000"
echo ""

# Pasar la variable de entorno explícitamente
MULTIMEDIA_PATH="$MULTIMEDIA_PATH" node server.js
EOSCRIPT
chmod +x "$CARPETA/iniciar.sh"

# Instrucciones
cat > "$CARPETA/LEEME.txt" << 'EOF'
=== CÓMO USAR ===
1. Ejecuta: ./iniciar.sh
2. La primera vez te pedirá la ruta multimedia.
   - Ejemplo Linux: /home/usuario/Escritorio/multimedia
   - Ejemplo Windows: D:/multimedia
3. Abre en navegador: http://localhost:3000

Para cambiar la ruta después: edita el archivo .env o borra la línea MULTIMEDIA_PATH
EOF

echo -e "${VERDE}✅ Carpeta '$CARPETA' lista.${NC}"
echo -e "${AMARILLO}👉 Para probar: cd $CARPETA && ./iniciar.sh${NC}"