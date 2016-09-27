import urllib.request
file = open("countries.txt","r+")
import time
#countries=[]
#for line in file:
#    line = line.replace(" ","_")
#    countries.append(line)
#file.seek(0)
#file.truncate()
#for country in countries:
#    file.write(country)
#file.close()
failed=[]
for line in file:
    link="http://www.wikipedia.org/wiki/"+line
    print(line)
    time.sleep(0.1)
    try:
        f=urllib.request.urlopen(link)
        myfile=f.read()
        if str(myfile).find("Wikipedia does not have an article with this exact name.") != -1:
            print("doesn't work. (Error 1)")
            failed.append(line)
    except:
        print("doesn't work (Error 2)")
        failed.append(line)

print(failed)
file.close()
