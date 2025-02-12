from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains


def openDriver():
    # Caminho 
    url = 'http://localhost:5173/'


    # Inicializar o driver
    driver = webdriver.Chrome()
    
    driver.get(url)
    driver.fullscreen_window()
    return driver

def preenche_info_produto(driver, produto):
    nome = driver.find_element(By.CSS_SELECTOR, "div.rounded-md:nth-child(1) > span:nth-child(1) > input:nth-child(2)")
    nome.send_keys(produto['nome'])
    time.sleep(0.5)

    preco = driver.find_element(By.CSS_SELECTOR, "div.rounded-md:nth-child(2) > span:nth-child(1) > input:nth-child(2)")
    preco.send_keys(produto['preco'])
    time.sleep(0.5)

    estoque = driver.find_element(By.CSS_SELECTOR, "div.has-\[\:focus\]\:outline:nth-child(3) > span:nth-child(1) > input:nth-child(2)")
    estoque.send_keys('')
    estoque.send_keys(produto['estoque'])
    time.sleep(0.5)
    cat = driver.find_element(By.CSS_SELECTOR, "select.outline-none")
    cat.click()
    time.sleep(0.5)
    categorias = driver.find_elements(By.CSS_SELECTOR, "select.outline-none > option")
    for categoria in categorias:
        if categoria.text == produto['categoria']:
            categoria.click()
    time.sleep(0.5)

    descricao = driver.find_element(By.CSS_SELECTOR, "textarea.outline-none")
    descricao.send_keys(produto['descricao']) 
    time.sleep(4)
    driver.find_element(By.CSS_SELECTOR, "div.hidden > button:nth-child(1)").click()

def verifica_cadastro(driver):
    if driver.find_element(By.CSS_SELECTOR, ".w-\[90vw\] > p:nth-child(3)").text == 'Produto cadastrado com sucesso! Você será redirecionado para a página inicial.':
        return 1
    return 0

def cadastro(driver, produto):
    # li.bg-white:nth-child(3) > a:nth-child(1)  css do botao cadastro
    cadastro = driver.find_element(By.CSS_SELECTOR, "li.bg-white:nth-child(3) > a:nth-child(1)")
    time.sleep(1)
    cadastro.click()
    time.sleep(4)
    preenche_info_produto(driver, produto)
    time.sleep(8)
    return verifica_cadastro(driver)

def main():
    produto = {
        'nome': 'Paozinho queijo automatizado',
        'preco': '760', # 7 reais e 60 centavos
        'estoque': '15',
        'categoria': 'Salgados',
        'descricao': 'Delicioso pão mineiro feito de queijo com selenium'
    }
    driver = openDriver()
    time.sleep(5)
    # button.bg-orange
    btn_prosseguir = driver.find_element(By.CSS_SELECTOR, "button.bg-orange")
    if cadastro(driver, produto) == 1:
        btn_prosseguir = driver.find_element(By.CSS_SELECTOR, "button.bg-orange")
        btn_prosseguir.click()
        time.sleep(10)
        print("Parabéns seu produto foi cadastrado com sucesso!")
    else:
        print("Poxa, tente novamente o cadastro..")
    
main()