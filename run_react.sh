#!/bin/bash

# Скрипт для запуска React приложения Samarkand City Mall
# Использует Python для создания простого HTTP сервера

echo "========================================="
echo "  Samarkand City Mall - React Demo"
echo "========================================="
echo ""

# Проверяем, установлен ли Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 не найден. Пожалуйста, установите Python3."
    exit 1
fi

echo "✅ Python3 найден"
echo ""

# Определяем порт
PORT=8080

# Проверяем, занят ли порт
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Порт $PORT уже занят. Пытаемся использовать порт 8081..."
    PORT=8081
    
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        echo "❌ Порт $PORT также занят. Остановите другие серверы и попробуйте снова."
        exit 1
    fi
fi

echo "🚀 Запуск сервера на порту $PORT..."
echo ""
echo "📱 Откройте браузер и перейдите по адресу:"
echo "   http://localhost:$PORT"
echo ""
echo "⚠️  Нажмите Ctrl+C для остановки сервера"
echo ""
echo "========================================="
echo ""

# Запускаем простой HTTP сервер
python3 -m http.server $PORT
