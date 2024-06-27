import sys

a = set()
states, valid, solved, path = set(), set(), set(), set()
DFA = []
k = 0

def Formatter(line):
    tokens = [token for token in line.split() if token]
    return tokens

def AlphabetA(line):
    tokens = Formatter(line)
    for token in tokens:
        a.add(token)

def StatesS(line):
    global k
    tokens = Formatter(line)
    for token in tokens:
        try:
            cID = int(token[1:])  # Convertir la parte numérica del estado a entero
            states.add(cID)
        except ValueError as e:
            print(f"Error al convertir {token} a entero: {e}")
    k = len(tokens)

def ValidValid(line):
    tokens = Formatter(line)
    for token in tokens:
        try:
            cID = int(token[1:])  # Convertir la parte numérica del estado a entero
            valid.add(cID)
        except ValueError as e:
            print(f"Error al convertir {token} a entero: {e}")

def Cleaner(line):
    tokens = Formatter(line)
    ans = []
    for token in tokens[2:]:
        if token not in ['+', '/']:
            ans.append(token)
    return ans

def PlusExpresion(expr1, expr2):
    return f"( {expr1} + {expr2} )"

def MakeNet(conect):
    net = {}
    for item in conect:
        try:
            parts = item.split('X')
            path = parts[0] if parts[0] != '/' else 'λ'  # Tratar "/" como λ
            ID = int(parts[1])
            if ID in net:
                net[ID] = PlusExpresion(net[ID], path)
            else:
                net[ID] = path
        except ValueError as e:
            print(f"Error al procesar {item}: {e}")
    return net

def Mapping(node, id):
    print(f"X{id}:")
    for key, value in node.items():
        print(f"\033[32m{key} => {value}\033[0m")

def Arden(id):
    node = DFA[id]
    if id not in node or node[id] == "":
        return
    obj = f"({node[id]})*"
    del node[id]
    if not node:
        node[k] = obj
    else:
        for key in list(node.keys()):
            node[key] = obj + node[key]
    DFA[id] = node
    Mapping(DFA[id], id)

def IfSolved(node):
    return node in solved

def IfPath(node):
    return node in path

def MixMaps(target, source):
    aux = DFA[target]
    src = DFA[source]
    obj = aux[source]
    del aux[source]
    for key, value in src.items():
        if key in aux:
            aux[key] = PlusExpresion(obj + value, aux[key])
        else:
            aux[key] = obj + value
    if target in valid:
        if len(aux) == 2 and target in aux:
            aux[k] = aux[target] + "*"
            del aux[target]
    else:
        if len(aux) == 1 and target in aux:
            aux[k] = aux[target] + "*"
            del aux[target]
    DFA[target] = aux

def All(node, start):
    path.add(start)
    for key in list(node.keys()):
        if not IfSolved(key) and not IfPath(key):
            All(DFA[key], key)
            MixMaps(start, key)
    if start in node:
        Arden(start)
    path.remove(start)
    return node

def DataFiles():
    global k
    filename = input("Ingrese el nombre del archivo: ")
    if not filename:
        return

    l = 1
    try:
        with open(filename, 'r') as file:
            for cline in file:
                cline = cline.strip()
                if l == 1:
                    AlphabetA(cline)
                    print("Alfabeto:", " ".join(a))
                elif l == 2:
                    StatesS(cline)
                    print("Estados:", " ".join(map(str, states)))
                elif l == 3:
                    ValidValid(cline)
                    print("Estados válidos:", " ".join(map(str, valid)))
                else:
                    clean = Cleaner(cline)
                    current = MakeNet(clean)
                    if l - 4 in valid:
                        current[k] = "λ"  # Representar el símbolo λ
                    DFA.append(current)
                    print(f"Ecuación para X{l - 4}:")
                    print(" + ".join(f"{value}X{key}" if key != k else value for key, value in current.items()) + "\n")
                l += 1

        solved.add(k)
        All(DFA[0], 0)
        print("Expresión Regular:")
        Mapping(DFA[0], 0)
    except Exception as e:
        print("Error:", str(e))

if __name__ == "__main__":
    DataFiles()
