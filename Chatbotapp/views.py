# from django.shortcuts import render
# from django.http import HttpResponse

# # Create your views here.

# from chatterbot import ChatBot
# from chatterbot.trainers import ListTrainer

# bot=ChatBot('chatbot' ,read_only=False,
# logic_adapters=[
#     {
#        'import_path':'chatterbot.logic.BestMatch',
#         'default_response':'Sorry,I dont know what that means',  
#         'maximum_similarity_threshold':0.90,

#     }
#     ])

# conversation = [
#     "Hello",
#     "Hi there!",
#     "How are you doing?",
#     "I'm doing great.",
#     "That is good to hear",
#     "Thank you.",
#     "You're welcome."
# ]

# trainer = ListTrainer(bot)
# trainer.train(conversation)

# # trainer = ChatterBotCorpusTrainer(bot)
# # trainer.train('chatterbot.corpus.english')

from django.shortcuts import render
from django.http import HttpResponse
import openai
from llama_index.core import VectorStoreIndex,SimpleDirectoryReader,ServiceContext,PromptTemplate, Document
from llama_index.llms.openai import OpenAI
from llama_index.core import Settings
import openai


openai.api_key = "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"

def read_data():
    
  reader =SimpleDirectoryReader(input_dir=r"/home/sanchit/San/mini/mini project/data", recursive=True)
  docs = reader.load_data()

  service_context = ServiceContext.from_defaults(llm=OpenAI(model="gpt-3.5-turbo", temperature=0.5, system_prompt="You are an expert on the docs and can provide helpful summaries"))
  index = VectorStoreIndex.from_documents(docs, service_context=service_context)
  chat_engine = index.as_chat_engine(chat_mode="condense_question", verbose=True)
  return chat_engine

chat_engine = read_data()
prompt ="""Summarize the main points and key information from the provided PDF document.
 The document covers [brief description of the content]. Please generate a concise summary of approximately 3-4 sentences. """
response = chat_engine.chat(prompt)
print(response.response)



# def chatbot_view(request):
#     if request.method == 'POST':
#         chat_engine = read_data()
#         prompt = request.POST.get('prompt', '')
#         response = chat_engine.chat(prompt)
#         print(response)
#         return render(request, 'chatbot.html', {'prompt': prompt, 'response': response})
#     else:
#         return render(request, 'chatbot.html', {})



def home(request):
    return render(request,'home.html')


def getResponse(request):
    chat_engine = read_data()
    usermessage=request.GET.get('userMessage')
    response = chat_engine.chat(usermessage)
    # response = str(bot.get_response(usermessage))
    print(response)
    return HttpResponse(response)

