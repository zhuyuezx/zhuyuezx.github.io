---
layout: post
title:  "Summer Internship at Pardee Lab"
date:   2022-09-08 19:18:00
category: Daily
image: /images/image-19.jpg
---
Throughout this summer, I've been working at **[Pardee Lab](https://www.pardeelab.org/)** at University of Toronto. This was absolutely a precious yet challending experience.

### Group Photo
**Here is the group photo of the lab, Doctor Keith, my supervisor, is at the fourth counting from the left of the first row**, while I'm at the fifth counting from the left of the second row.

![Group_Photo_whole_lab](/post-images/Lab_Intern/1.jpg)

### Brief Introduction of My Task
Although Pardee Lab is a bio-focused lab, as a computer science undergrad, I participated in its computational project. The project aims at developing machine-learning guided biosimilar protein structure prediction combining with web-lab verification to really find some biosimilar proteins that may be easily to produce. In one sentence, **we aim at using machine learing to increase the efficiency of bio-research**. (what our team has accomplished in summer is marked as <span style="color:red">**red**</span> in flowchart)

![flowchart](/post-images/Lab_Intern/flowchart.png)

My task is about setting up a steady environment for alphafold2 - a machine learning software that can predict 3D-structure of a given amino sequence based on deep-learning. The problem is that it consumes extreme amount of resources like storage space and GPU.

Obviously, it's hard to setup a physical server in lab in short time, so I put my sight on google cloud server - a flexible and affordable alternative.

I overcame technical difficulties in alphafold setup and developed **(automation pipeline)[https://github.com/zhuyuezx/Pardee-Lab-computation-project-pipeline]** to helpe those non-professional users. At the end of the summer I also made a tutorial about the whole setup process:

<iframe width="960" height="640" src="https://www.youtube.com/embed/RtiSHDn5M_Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

It is reassuring that I've really used what I've learned from CS courses, like writing shell script for automation and linux commands to remote connect and operate on cloud servers. Moreover, lab-style weekly meeting and seminar really brought me the experience about how a lab operates and how I should conform with its pace to make my own contributions.

![summer_intern_group_photo](/post-images/Lab_Intern/2.jpg)

### Thoughts After Internship

Although being a CS student and it's hard for me to understand those professional biology terms, I can use my skills to genuinely help to boost the efficiency of bio research. Automation pipeline, cloud server setup, and software-assisted data analysis, these are far less than I can bring to my lab. 

Moreover, our team has students major in bio-informatics, statistics, computer science, chemistry, and engineering. As long as we can communicate effectively, the power of interdisciplinary cooperation helped us to come up with novel ideas and discover new research directions.

I believe that interdisciplinary research would become more and more common in the furture while computer science must be a indispensible part of it.

![3d](/post-images/Lab_Intern/pymol.png) **Modified Green Fluorescence Protein(GFPP) illustrated in 3D**