# Variáveis
PROJECT_NAME = meu-projeto
XAMPP_DIR = C:/xampp/htdocs
SOURCE_DIR = C:/Users/SeuUsuario/Documentos/$(PROJECT_NAME)

# Regras
.PHONY: deploy start stop open clean

# Copia os arquivos do projeto para o diretório do Apache
deploy:
	Copy-Item -Recurse -Force ./ $(XAMPP_DIR)

# Inicia o servidor Apache no XAMPP
start:
	Start-Process -FilePath 'C:/xampp/xampp-control.exe'

# Para o servidor Apache
stop:
	Stop-Process -Name 'xampp-control' -Force

# Abre o navegador no endereço do projeto
open:
	start http://localhost/$(PROJECT_NAME)

# Remove os arquivos do projeto do diretório do Apache
clean:
	Remove-Item -Recurse -Force '$(XAMPP_DIR)/$(PROJECT_NAME)'
