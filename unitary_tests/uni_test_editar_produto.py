from selenium import webdriver
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import pyautogui

def openDriver():
    # Caminho 
    url = 'http://localhost:5173/'


    # Inicializar o driver
    driver = webdriver.Chrome()
    
    driver.get(url)
    driver.fullscreen_window()
    return driver

def preenche_info_produto(driver, produto):
    btn_edit = driver.find_element(By.CSS_SELECTOR, "button.bg-orange") 
    btn_edit.click()
    time.sleep(2)
    # pyautogui.scroll(0)
    nome = driver.find_element(By.CSS_SELECTOR, "div.rounded-md:nth-child(1) > span:nth-child(1) > input:nth-child(2)")
    nome.click()
    pyautogui.hotkey("ctrl", "a")
    pyautogui.hotkey("delete")
    pyautogui.write(produto['n_nome'])
    
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    # time.sleep(0.5)

    # preco = driver.find_element(By.CSS_SELECTOR, "div.w-full:nth-child(2) > span:nth-child(1) > input:nth-child(2)")
    # preco.click()
    # time.sleep(0.5)
    # pyautogui.hotkey("delete")
    # pyautogui.hotkey("delete")
    # pyautogui.hotkey("delete")
    # pyautogui.write(produto['preco'])
    time.sleep(1)

    estoque = driver.find_element(By.CSS_SELECTOR, "div.rounded-md:nth-child(3) > span:nth-child(1) > input:nth-child(2)")
    estoque.click()
    pyautogui.hotkey("ctrl", "a")
    time.sleep(0.5)
    pyautogui.hotkey("delete")
    pyautogui.write(produto['estoque'])
    time.sleep(0.5)
    
    

    descricao = driver.find_element(By.CSS_SELECTOR, "textarea.outline-none")
    descricao.click()
    pyautogui.hotkey("ctrl", "a")
    
    pyautogui.write(produto['descricao']) 
    time.sleep(5)
    driver.find_element(By.CSS_SELECTOR, "button.bg-orange:nth-child(1)").click()

def verifica_edicao(driver):
    if driver.find_element(By.CSS_SELECTOR, "p.font-bold").text == 'Produto atualizado com sucesso! Você será redirecionado para a página inicial.':
        return 1
    return 0

def edita_produto(driver, produto):
    # li.cursor-pointer:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(1)
    # li.cursor-pointer:nth-child(5) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(1)
    # li.cursor-pointer:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(1)
    lista_produtos = driver.find_elements(By.CSS_SELECTOR, "ul.flex:nth-child(5) > li")
    flag = 0
    time.sleep(1)
    for i, prod in enumerate(lista_produtos):
        nome_list = driver.find_element(By.CSS_SELECTOR, f"li.cursor-pointer:nth-child({i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(1)").text
        print(nome_list)
        if produto['nome'] == nome_list:
            prod.click()
            flag = 1
            break
    if flag == 0:
        return 0
    
    time.sleep(4)
    preenche_info_produto(driver, produto)
    time.sleep(8)
    return verifica_edicao(driver)

def main():
    produto = {
        'nome': 'Paozinho queijo automatizado', 
        'n_nome': 'Paozinho queijo automatizado',
        'preco': '500', # 5 reais 
        'estoque': '20',
        'categoria': 'Salgados',
        'descricao': 'Delicioso pao mineiro feito com selenium'
    }
    driver = openDriver()
    time.sleep(5)
    # button.bg-orange
   
    if edita_produto(driver, produto) == 1:
        btn_prosseguir = driver.find_element(By.CSS_SELECTOR, "button.bg-orange")
        btn_prosseguir.click()
        time.sleep(10)
        print("Parabéns seu produto foi editado com sucesso!")
    else:
        print("Poxa, o produto não foi encontrado..")
    
main()