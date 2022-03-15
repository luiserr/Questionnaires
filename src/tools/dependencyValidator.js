import {NUMERIC} from "../const/questionTypes";

export function hasDependency(sections, question = {}, dependencies = []) {
  const dependency = searchDependency(question.id, dependencies);
  if (dependency) {
    const {
      dependsOperator: operator,
      dependsOfQuestion: questionId,
      dependsOfSection: sectionId,
      questionType,
      answerId
    } = dependency;
    const tryUser = searchAttempt(sections, sectionId, questionId);
    if (tryUser) {
      console.log(tryUser);
      const {attempt, answers} = tryUser;
      const questionValue = getDependencyAnswer(questionType, answers, attempt[0]);
      const dependencyValue = getDependencyAnswer(questionType, answers, answerId);
      console.log(dependencyValue, operator, questionValue)
      if (dependencyValue && questionValue) {
        return compareAnswer(questionValue, operator, dependencyValue);
      }
    }
    return false;
  }
  return true;
}

function searchDependency(questionId, dependencies = []) {
  return dependencies.find(dependency => parseInt(dependency.questionId) === parseInt(questionId));
}

function searchAttempt(sections = [], sectionId, questionId) {
  const section = sections.find(item => item.id === sectionId);
  if (section) {
    const question = section.questions?.find(item => item.id === questionId);
    if (question) {
      return {
        attempt: question.attempts?.answers ?? [],
        answers: question.answers ?? []
      };
    }
  }
  return false;
}

function getDependencyAnswer(type, answers = [], id) {
  const currentAnswer = answers.find(answer => answer.id === id)
  if (currentAnswer) {
    switch (type) {
      case NUMERIC:
        return currentAnswer['value'];
      default:
        return currentAnswer['id']
    }
  }
  return false;
}

function compareAnswer(valueAnswer, operator, valueDependency) {
  switch (operator) {
    case '=':
      console.log(valueAnswer, operator, valueDependency, valueAnswer == valueDependency, valueAnswer === valueDependency)
      return valueAnswer == valueDependency;
    case '>':
      return valueAnswer > valueDependency;
    case '>=':
      return valueAnswer >= valueDependency;
    case '<':
      return valueAnswer < valueDependency;
    case '<=':
      return valueAnswer <= valueDependency;
    default:
      return false;
  }
}