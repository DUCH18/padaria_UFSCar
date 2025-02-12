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


def verifica_exlusao(produto, driver, lista_produtos):
    time.sleep(1)
    for i, prod in enumerate(lista_produtos):
        if i == len(lista_produtos) - 1:
            break
        nome_list = driver.find_element(By.CSS_SELECTOR, f"li.cursor-pointer:nth-child({i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(1)").text
        if produto['nome'] == nome_list:
            
            return 0
    
    
    return 1

def exclui_produto(driver, produto):
    # li.cursor-pointer:nth-child(4) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(1)
    # li.cursor-pointer:nth-child(14) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(1)
    # li.cursor-pointer:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(1)
    lista_produtos = driver.find_elements(By.CSS_SELECTOR, "ul.flex:nth-child(5) > li")
    flag = 0
    time.sleep(1)
    for i, prod in enumerate(lista_produtos):
        if i == len(lista_produtos) - 1:
            break
        nome_list = driver.find_element(By.CSS_SELECTOR, f"li.cursor-pointer:nth-child({i+1}) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > p:nth-child(1)").text
       
        if produto['nome'] == nome_list:
            prod.click()
            flag = 1
            break
    if flag == 0:
        return 0
    
    time.sleep(4)
    driver.find_element(By.CSS_SELECTOR, ".bg-brown").click() 
    time.sleep(4)
    driver.find_element(By.CSS_SELECTOR, "button.bg-brown:nth-child(5)").click()
    
    time.sleep(8)
    return verifica_exlusao(produto, driver, lista_produtos)

def main():
    produto = {
        'nome': 'Paozinho queijo automatizado',
        
    }
    driver = openDriver()
    time.sleep(5)
    # button.bg-orange
   
    if exclui_produto(driver, produto) == 1:
        # btn_prosseguir = driver.find_element(By.CSS_SELECTOR, "button.bg-orange")
        # btn_prosseguir.click()
        time.sleep(4)
        print("Parabéns seu produto foi excluido com sucesso!")
    else:
        print("Poxa, o produto não foi encontrado..")
    
main()