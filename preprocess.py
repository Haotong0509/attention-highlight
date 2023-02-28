import json
import matplotlib.pyplot as plt

def weight_normalization(data):
    weight = []
    for record in data:
        weight.append(record['weight'])
    weight_min = min(weight)
    weight_range = max(weight) - min(weight)
    weight_normalized = [(x - weight_min)/weight_range for x in weight]
    plt.plot(weight_normalized)
    plt.show()
    for i in range(len(weight_normalized)):
        data[i]['weight'] = weight_normalized[i]
    with open('/Users/haotong/attention-highlight/attention_weight.json', 'w') as f:
        f.write(json.dumps(data))

if __name__ == '__main__':
    with open('/Users/haotong/attention-highlight/data.json') as f:
        f_dict = json.load(f)
        weight_normalization(f_dict)