---
title: Making “invisible” technology understandable
date: 2026-11-21
summary: "Conversations with friends and family led me to a question behind Hidee: how can we make technical processes visible enough for people to understand them and decide when to intervene?"
tags: ['technology visualization', 'AI', 'privacy', 'Hidee']
---

Conversations with friends and family without a technical background have made me notice something: the computers and AI systems we use every day still feel strangely intangible. They sit right in front of us, yet it can be hard to picture how they actually work.

We send a message, upload a file, or ask an AI to complete a task. Seconds later, a response appears on the screen. But what happens between those two moments? Where does the data go? Which services handle it? Who stores and processes it? Where, physically, is the thing we call “the cloud”?

Someone familiar with computing can usually picture a rough path. For most other people, that space is blank—and words like “cloud,” “model,” and “agent” do little to fill it in on their own.

## There is a physical world beyond the screen

“The cloud,” after all, is made of physical places. Yet using an online service rarely brings to mind a distant data center, its power supply, or its cooling equipment. There is little visible connection between an effortless click and the resources it draws on, or everyday life in the communities nearby.

I would like to help make that connection more concrete. How does a data center work? Why does computing require so much energy and cooling? When nearby residents raise concerns about noise or resource use, which facilities and operating practices are involved? And how do the answers vary across places and systems?

Answering those questions requires specific sources and close attention to local conditions. What interests me is how to present that information so people without a technical background can understand and discuss it, without having to learn an entire engineering vocabulary first.

## Understanding should not require becoming an expert

Nobody needs to master network protocols, model training, or data center engineering simply to use technology. But when a system handles someone’s data, acts on their behalf, or affects their surroundings, they should have a real chance to understand what is happening.

To me, being informed means knowing enough to ask questions. Why does this information need to be sent? Who can see it? If I say no, do I have another option?

To even ask those questions, people need a process they can picture. When all someone can see is their input and the system’s output, it is hard to know where to look closer or what they have actually agreed to.

## A “memory palace” for abstract processes

I think of this as helping people build a “memory palace” for technology. I borrow the phrase for a simple idea: giving abstract processes recognizable places, paths, and actions, so people have a mental framework they can return to whenever they encounter a similar situation.

Take a file leaving someone’s device. Which parts go to an external service? Where might a copy remain? How does the result come back? At what point does an AI request turn into an operation that reads a file, sends information, or modifies a record? Which steps can someone inspect, change, or stop?

A visualization might be a diagram, an animation, or a clear preview before an action runs. It can be simple. What matters is whether it helps someone connect what they see on screen with the process behind it.

That explanation also needs to be honest. In a diagram, what does an arrow actually represent? Which steps were directly observed, and which are simplifications? Even a memorable mental model should leave room for uncertainty and differences across systems.

## Hidee: a first step

Both the physical footprint of computing and the software-level flow of personal data suffer from this invisibility. As a starting point, I chose to focus on the part closest to everyday personal decisions—which led me to start building [Hidee](https://hidee.net/).

When we give an AI agent a task, we usually describe a goal, such as “help me organize these materials.” On the surface, it sounds like tidying up a local folder; behind the scenes, pursuing that goal may involve reading private documents, calling external APIs, and sending sensitive details off the device. There is a lot to explain between that single sentence and the operations it sets in motion.

I want Hidee to help people without a technical background see what an agent is about to send, who will receive it, and where they can intervene. I hope to refine this over time, especially by testing whether those explanations actually make sense in everyday use.

An AI agent’s actions are not magic, and they don’t happen just by making a wish. They depend on software, data, permissions, and external services. Making those processes visible can help people decide what information to share, which actions to allow, and when to stop them.

I see this as long-term work in the public interest. As technology moves quickly, I hope we also take the time to help more people understand it—creating meaningful opportunities to stay informed and take part in decisions about how it is used.
