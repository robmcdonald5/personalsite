<section class="w-full max-w-[1440px] h-[656px] flex justify-center items-center flex-col px-[5%] md:px-[180px]">
  <div class="flex flex-col items-center gap-[90px] h-full justify-center">
    <div class="flex justify-center items-center flex-row gap-[49px] w-full max-w-[1080px]">
      <div class="flex-1 h-0 border-solid border-[#E0E0E0] border-b"></div>
      <span class="text-[#000000] text-xl font-montserrat font-medium whitespace-nowrap">CODE SAMPLES</span>
      <div class="flex-1 h-0 border-solid border-[#E0E0E0] border-b"></div>
    </div>
    <div class="flex justify-start items-center flex-row gap-[40px] md:gap-[120px] overflow-x-auto">
      <div class="w-[280px] h-[240px] bg-[#1e1e1e] border-solid border-[#2d2d30] border rounded-lg shadow-lg relative">
        <div class="absolute top-[176px] left-0 w-full h-[1px] bg-[#4A5568]"></div>
        <div class="text-[#d4d4d4] text-xl font-roboto font-light absolute left-[24px] top-[193px]">
          Model Training
        </div>
        <div class="w-[264px] h-[160px] rounded-tl-md rounded-tr-md absolute left-[8px] top-[8px] bg-[#1e1e1e] overflow-hidden">
          <!-- VS Code-style header -->
          <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
            <div class="flex items-center gap-1">
              <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
            </div>
            <div class="ml-4 text-[#cccccc] text-xs font-mono">Python</div>
          </div>
          <!-- Code content -->
          <div class="p-2 text-xs font-mono leading-tight text-[#d4d4d4] overflow-auto h-full">
            <div class="text-[#6a9955]"># Loss and optimizer</div>
            <div><span class="text-[#9cdcfe]">criterion</span> = <span class="text-[#dcdcaa]">nn</span>.<span class="text-[#dcdcaa]">CrossEntropyLoss</span>()</div>
            <div><span class="text-[#9cdcfe]">optimizer</span> = <span class="text-[#dcdcaa]">torch</span>.<span class="text-[#dcdcaa]">optim</span>.<span class="text-[#dcdcaa]">Adam</span>(<span class="text-[#9cdcfe]">model</span>.<span class="text-[#dcdcaa]">parameters</span>(), <span class="text-[#9cdcfe]">lr</span>=<span class="text-[#9cdcfe]">learning_rate</span>)</div>
            <div class="mt-1"></div>
            <div class="text-[#6a9955]"># The training loop</div>
            <div><span class="text-[#c586c0]">for</span> <span class="text-[#9cdcfe]">epoch</span> <span class="text-[#c586c0]">in</span> <span class="text-[#dcdcaa]">range</span>(<span class="text-[#9cdcfe]">num_epochs</span>):</div>
            <div class="pl-4"><span class="text-[#c586c0]">for</span> (<span class="text-[#9cdcfe]">words</span>, <span class="text-[#9cdcfe]">labels</span>) <span class="text-[#c586c0]">in</span> <span class="text-[#9cdcfe]">train_loader</span>:</div>
            <div class="pl-8"><span class="text-[#9cdcfe]">words</span> = <span class="text-[#9cdcfe]">words</span>.<span class="text-[#dcdcaa]">to</span>(<span class="text-[#9cdcfe]">device</span>)</div>
            <div class="pl-8"><span class="text-[#9cdcfe]">labels</span> = <span class="text-[#9cdcfe]">labels</span>.<span class="text-[#dcdcaa]">to</span>(<span class="text-[#9cdcfe]">dtype</span>=<span class="text-[#dcdcaa]">torch</span>.<span class="text-[#dcdcaa]">long</span>).<span class="text-[#dcdcaa]">to</span>(<span class="text-[#9cdcfe]">device</span>)</div>
            <div class="mt-1"></div>
            <div class="pl-8"><span class="text-[#6a9955]"># Forward pass</span></div>
            <div class="pl-8"><span class="text-[#9cdcfe]">outputs</span> = <span class="text-[#9cdcfe]">model</span>(<span class="text-[#9cdcfe]">words</span>)</div>
            <div class="pl-8"><span class="text-[#9cdcfe]">loss</span> = <span class="text-[#9cdcfe]">criterion</span>(<span class="text-[#9cdcfe]">outputs</span>, <span class="text-[#9cdcfe]">labels</span>)</div>
            <div class="mt-1"></div>
            <div class="pl-8"><span class="text-[#6a9955]"># Backward and optimize</span></div>
            <div class="pl-8"><span class="text-[#9cdcfe]">optimizer</span>.<span class="text-[#dcdcaa]">zero_grad</span>()</div>
            <div class="pl-8"><span class="text-[#9cdcfe]">loss</span>.<span class="text-[#dcdcaa]">backward</span>()</div>
            <div class="pl-8"><span class="text-[#9cdcfe]">optimizer</span>.<span class="text-[#dcdcaa]">step</span>()</div>
            <div class="mt-1"></div>
            <div class="pl-4"><span class="text-[#c586c0]">if</span> (<span class="text-[#9cdcfe]">epoch</span>+1) % 100 == 0:</div>
            <div class="pl-8"><span class="text-[#dcdcaa]">print</span>(<span class="text-[#ce9178]">f'Epoch [{'{'}epoch+1{'}'}/{'{'}num_epochs{'}'}], Loss: {'{'}loss.item():.4f{'}'}'</span>)</div>
          </div>
        </div>
      </div>
      <div class="w-[280px] h-[240px] bg-[#1e1e1e] border-solid border-[#2d2d30] border rounded-lg shadow-lg relative">
        <div class="absolute top-[176px] left-0 w-full h-[1px] bg-[#4A5568]"></div>
        <div class="text-[#d4d4d4] text-xl font-roboto font-light absolute left-[24px] top-[193px]">
          API & Web Integration
        </div>
        <div class="w-[264px] h-[160px] rounded-tl-md rounded-tr-md absolute left-[8px] top-[8px] bg-[#1e1e1e] overflow-hidden">
          <!-- VS Code-style header -->
          <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
            <div class="flex items-center gap-1">
              <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
            </div>
            <div class="ml-4 text-[#cccccc] text-xs font-mono">Python</div>
          </div>
          <!-- Code content -->
          <div class="p-2 text-xs font-mono leading-tight text-[#d4d4d4] overflow-auto h-full">
            <div class="text-[#6a9955]"># Set up SOCKS proxy</div>
            <div><span class="text-[#9cdcfe]">quotaguard_url</span> = <span class="text-[#dcdcaa]">os</span>.<span class="text-[#dcdcaa]">getenv</span>(<span class="text-[#ce9178]">'QUOTAGUARDSTATIC_SOCKS_URL'</span>)</div>
            <div><span class="text-[#c586c0]">if</span> <span class="text-[#9cdcfe]">quotaguard_url</span>:</div>
            <div class="pl-4"><span class="text-[#9cdcfe]">parsed</span> = <span class="text-[#dcdcaa]">urlparse</span>(<span class="text-[#9cdcfe]">quotaguard_url</span>)</div>
            <div class="pl-4"><span class="text-[#dcdcaa]">socks</span>.<span class="text-[#dcdcaa]">set_default_proxy</span>(</div>
            <div class="pl-8"><span class="text-[#dcdcaa]">socks</span>.<span class="text-[#dcdcaa]">PROXY_TYPE_SOCKS5</span>,</div>
            <div class="pl-8"><span class="text-[#9cdcfe]">parsed</span>.<span class="text-[#dcdcaa]">hostname</span>,</div>
            <div class="pl-8"><span class="text-[#9cdcfe]">parsed</span>.<span class="text-[#dcdcaa]">port</span>,</div>
            <div class="pl-8"><span class="text-[#9cdcfe]">parsed</span>.<span class="text-[#dcdcaa]">username</span>,</div>
            <div class="pl-8"><span class="text-[#9cdcfe]">parsed</span>.<span class="text-[#dcdcaa]">password</span></div>
            <div class="pl-4">)</div>
            <div class="mt-1"></div>
            <div class="pl-4"><span class="text-[#dcdcaa]">socket</span>.<span class="text-[#dcdcaa]">socket</span> = <span class="text-[#dcdcaa]">socks</span>.<span class="text-[#dcdcaa]">socksocket</span></div>
          </div>
        </div>
      </div>
      <div class="w-[280px] h-[240px] bg-[#1e1e1e] border-solid border-[#2d2d30] border rounded-lg shadow-lg relative">
        <div class="absolute top-[176px] left-0 w-full h-[1px] bg-[#4A5568]"></div>
        <div class="text-[#d4d4d4] text-xl font-roboto font-light absolute left-[24px] top-[193px]">
          NLP & Preprocessing
        </div>
        <div class="w-[264px] h-[160px] rounded-tl-md rounded-tr-md absolute left-[8px] top-[8px] bg-[#1e1e1e] overflow-hidden">
          <!-- VS Code-style header -->
          <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
            <div class="flex items-center gap-1">
              <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
            </div>
            <div class="ml-4 text-[#cccccc] text-xs font-mono">Python</div>
          </div>
          <!-- Code content -->
          <div class="p-2 text-xs font-mono leading-tight text-[#d4d4d4] overflow-auto h-full">
            <div class="text-[#6a9955]"># Precompute intent embeddings</div>
            <div><span class="text-[#9cdcfe]">all_patterns</span> = []</div>
            <div><span class="text-[#9cdcfe]">pattern_tags</span> = []</div>
            <div class="mt-1"></div>
            <div class="text-[#6a9955]"># Load all patterns from intents file</div>
            <div><span class="text-[#c586c0]">for</span> <span class="text-[#9cdcfe]">intent</span> <span class="text-[#c586c0]">in</span> <span class="text-[#9cdcfe]">intents</span>[<span class="text-[#ce9178]">'intents'</span>]:</div>
            <div class="pl-4"><span class="text-[#9cdcfe]">tag</span> = <span class="text-[#9cdcfe]">intent</span>[<span class="text-[#ce9178]">'tag'</span>]</div>
            <div class="pl-4"><span class="text-[#c586c0]">for</span> <span class="text-[#9cdcfe]">pattern</span> <span class="text-[#c586c0]">in</span> <span class="text-[#9cdcfe]">intent</span>[<span class="text-[#ce9178]">'patterns'</span>]:</div>
            <div class="pl-8"><span class="text-[#9cdcfe]">cleaned_pattern</span> = <span class="text-[#dcdcaa]">clean_sentence</span>(<span class="text-[#9cdcfe]">pattern</span>)</div>
            <div class="pl-8"><span class="text-[#9cdcfe]">all_patterns</span>.<span class="text-[#dcdcaa]">append</span>(<span class="text-[#9cdcfe]">cleaned_pattern</span>)</div>
            <div class="pl-8"><span class="text-[#9cdcfe]">pattern_tags</span>.<span class="text-[#dcdcaa]">append</span>(<span class="text-[#9cdcfe]">tag</span>)</div>
            <div class="mt-1"></div>
            <div><span class="text-[#9cdcfe]">pattern_embeddings</span> = <span class="text-[#dcdcaa]">sentence_model</span>.<span class="text-[#dcdcaa]">encode</span>(<span class="text-[#9cdcfe]">all_patterns</span>)</div>
            <div class="mt-1"></div>
            <div><span class="text-[#dcdcaa]">logger</span>.<span class="text-[#dcdcaa]">debug</span>(<span class="text-[#ce9178]">f"Loaded and pre-computed embeddings for {'{'}len(all_patterns){'}'} patterns."</span>)</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>