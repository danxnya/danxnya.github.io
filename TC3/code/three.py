import nltk
from nltk import CFG
import json

# Definir la gramática simplificada
grammar = CFG.fromstring("""
    S -> Asignacion
    Asignacion -> Identificador '=' Expresion ';' | Identificador '=' Asignacion
    Expresion -> Expresion '+' Termino | Expresion '-' Termino | Termino
    Termino -> Termino '*' Factor | Termino '/' Factor | Termino '%' Factor | Factor
    Factor -> '(' Expresion ')' | Numero | Identificador
    Numero -> Entero | Hexadecimal | NotacionCientifica
    Identificador -> Letra
    Hexadecimal -> '0''x'Hexadigit
    Entero -> Digito
    Hexadigit -> '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f'
    Letra -> 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z' | 'AB' | 'ABC' | 'VAR' | 'var' | 'Var1' | 'Var2' | 'Var3' | 'CatA' | 'CatB' | 'CatC' | 'CatD' | 'CatE' | 'CatF' | 'var11' | 'var12' | 'var13' | 'var14' | 'var15' | 'A2' | 'A1' | '12' | 'C5' | 'AC'
    Digito -> '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0312' | '0x12AB' | '5.12E+12' | '340' | '12' | '100' | '59'
""")

# Crear el parser
parser = nltk.ChartParser(grammar)

# Función para convertir árbol a diccionario
def tree_to_dict(tree):
    return {
        "name": tree.label(),
        "children": [tree_to_dict(child) if isinstance(child, nltk.Tree) else {"name": child} for child in tree]
    }

# Leer expresiones del archivo
with open('./TC3/code/expressions.txt', 'r') as file:
    expressions = file.readlines()

trees_data = []
invalid_expressions = []

# Procesar cada expresión
for i, expression in enumerate(expressions):
    sentence = expression.strip().split()
    try:
        trees = [tree for tree in parser.parse(sentence)]
        if trees:
            tree = trees[0]
            tree_data = tree_to_dict(tree)
            trees_data.append(tree_data)
        else:
            invalid_expressions.append(expression.strip())
    except ValueError:
        invalid_expressions.append(expression.strip())

# Guardar todos los árboles válidos en un archivo JSON
with open('./TC3/code/trees_data.json', 'w') as f:
    json.dump(trees_data, f, indent=2)

# Opcional: Guardar expresiones inválidas en un archivo de log
if invalid_expressions:
    with open('./TC3/code/invalid_expressions.log', 'w') as f:
        for expr in invalid_expressions:
            f.write(expr + '\n')